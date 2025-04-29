/*==============================================================================
---------------------------------- Functions -----------------------------------
==============================================================================*/
/**
 * Get the session token from localStorage.
 * @returns {string|null}
 */
export function getSessionToken() {
  return localStorage.getItem('session_token'); }

/**
 * Set the session token in localStorage.
 * @param {string} token
 */
export function setSessionToken(token) {
  localStorage.setItem('session_token', token); }

/**
 * Remove the session token from localStorage.
 */
export function removeSessionToken() {
  localStorage.removeItem('session_token'); }

/**
 * Get the current user object from localStorage.
 * @returns {Object|null}
 */
export function getCurrentUser() {
  const user = localStorage.getItem('current_user');
  return user ? JSON.parse(user) : null; }

/**
 * Set the current user object in localStorage.
 * @param {Object} user
 */
export function setCurrentUser(user) {
  window.CurrentUser = user;
  localStorage.setItem('current_user', JSON.stringify(user)); }

/**
 * Remove the current user from localStorage.
 */
export function removeCurrentUser() {
  localStorage.removeItem('current_user'); }