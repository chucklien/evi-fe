/**
 * Function to get a cookie value by key.
 * This function should only be used on the client side.
 * @param key - The name of the cookie.
 * @returns The value of the cookie if found, otherwise null.
 */
export function getCookie(key: string): string | null {
  if (typeof window === 'undefined') {
    return null; // Ensure this function only runs on the client
  }

  const name = key + '=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i].trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return null;
}

/**
 * Function to set a cookie with a specified key, value, and expiry time.
 * This function should only be used on the client side.
 * @param key - The name of the cookie.
 * @param value - The value to be stored in the cookie.
 * @param expiry - The expiry time in days. Default is 1 day.
 */
export function setCookie(key: string, value: string, expiry: number = 1): void {
  if (typeof window === 'undefined') {
    return; // Ensure this function only runs on the client
  }

  const d = new Date();
  d.setTime(d.getTime() + expiry * 24 * 60 * 60 * 1000);
  const expires = 'expires=' + d.toUTCString();
  document.cookie = `${key}=${encodeURIComponent(value)};${expires};path=/`;
}
