import { v4 as uuidv4 } from 'uuid';
import { getCookie, setCookie } from './cookies';

/**
 * Function to get the session ID from a cookie.
 * If it doesn't exist, generates a new UUID, saves it to a cookie, and returns it.
 * @returns The session ID.
 */
export function getSessionId(): string {
  const SESSION_COOKIE_NAME = 'h_s_sid';

  // Retrieve the session ID from the cookie or generate a new one
  let sessionId = getCookie(SESSION_COOKIE_NAME) ?? uuidv4();

  // Save the session ID if it was newly created
  if (!getCookie(SESSION_COOKIE_NAME)) {
    setCookie(SESSION_COOKIE_NAME, sessionId, 1); // 1 day expiry
  }

  return sessionId;
}
