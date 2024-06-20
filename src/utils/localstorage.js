/**
 * GET
 */
export function getUserIdFromLocalStorage() {
  return localStorage.getItem('UserId');
}

export function getTokenFromLocalStorage() {
  return localStorage.getItem('Token');
}

/**
 * REMOVE
 */
export function removeUserIdFromLocalStorage() {
  return localStorage.removeItem('UserId');
}

export function removeTokenFromLocalStorage() {
  return localStorage.removeItem('Token');
}

/**
 * SET
 */
export function setUserIdFromLocalStorage(key, value) {
  return localStorage.setItem(key, value);
}

export function setTokenFromLocalStorage(key, value) {
  return localStorage.setItem(key, value);
}