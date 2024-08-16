"use client";
import { useEffect, useState, FC } from "react";
import { Voice } from "@/components/Voice";

const DAILY_USAGE_LIMIT = 60; // Daily usage limit in minutes
const DAILY_USAGE_COOKIE_NAME = "_d_u";

function setCookie(
  name: string,
  value: string | number,
  expireTimestamp: number = Date.now()
): void {
  const expires = "expires=" + new Date(expireTimestamp).toUTCString();
  document.cookie = `${name}=${value};${expires};path=/`;
}

function getCookie(name: string): string | null {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function checkDailyLimit(): boolean {
  const dailyCookie = getCookie(DAILY_USAGE_COOKIE_NAME);
  if (dailyCookie) {
    const [minutesUsed, timestamp] = dailyCookie.split(",").map(Number);
    if (minutesUsed >= DAILY_USAGE_LIMIT) {
      return false; // Deny access
    } else {
      return true; // Allow access
    }
  } else {
    const expireTimestamp = Date.now() + 1440 * 60 * 1000;
    // Set a new cookie with 0 minutes used and 24 hours expiration
    setCookie(
      DAILY_USAGE_COOKIE_NAME,
      `0, ${expireTimestamp}`,
      expireTimestamp
    ); // 1440 minutes = 24 hours
    return true; // Allow access
  }
}

function updateDailyUsage(minutes: number): void {
  const dailyCookie = getCookie(DAILY_USAGE_COOKIE_NAME);
  if (dailyCookie) {
    const [minutesUsed, timestamp] = dailyCookie.split(",").map(Number);
    setCookie(
      DAILY_USAGE_COOKIE_NAME,
      `${minutesUsed + minutes}, ${timestamp}`,
      timestamp
    ); // Update the cookie
  }
}

export const UsageLimit: FC<{ accessToken: string }> = ({ accessToken }) => {
  const [isAllowed, setIsAllowed] = useState<boolean>(true);

  useEffect(() => {
    const allowed = checkDailyLimit();
    setIsAllowed(allowed);

    if (allowed) {
      let timeSpent = 0;
      const interval = setInterval(() => {
        updateDailyUsage(1);
        const _allowed = checkDailyLimit();
        if (!_allowed) {
          clearInterval(interval);
          setIsAllowed(false);
          alert("You've reached your limit.");
        }
      }, 60000); // Check every minute

      return () => clearInterval(interval); // Clean up interval on unmount
    }
  }, []);

  if (!isAllowed) {
    return <div>You've reached your limit.</div>;
  }

  return <Voice accessToken={accessToken} />;
};
