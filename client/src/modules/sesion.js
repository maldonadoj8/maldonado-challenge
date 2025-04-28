/*==============================================================================
----------------------------------- Imports ------------------------------------
==============================================================================*/

/*---------------------------------- Server ----------------------------------*/
import { api, createHandler } from './server.js';

/*--------------------------------- Database ---------------------------------*/
import { handlerWrapper } from './database.js';

/*==============================================================================
----------------------------------- Exports ------------------------------------
==============================================================================*/
export { login, recoverSession, logOut };

/*==============================================================================
------------------------------------- APIs -------------------------------------
==============================================================================*/
/**
 * Sends a login request to the server with the provided email and password.
 *
 * @param {Object} [params={}] - Login parameters.
 * @param {string} params.email - User email.
 * @param {string} params.password - User password.
 * @param {Object} [handlers={}] - Optional handlers for API response 
 * (success, error, finally).
 * 
 * @returns {void}
 */
function login(params = {}, handlers = {}) {
  api({ 
    'api' : 'login',
    'data': { 
      'email'   : params.email,
      'password': params.password }, 
    'handler': createHandler(handlerWrapper(handlers))}); };

/**
 * Sends a session recovery request to the server with the provided token.
 *
 * @param {Object} [params={}] - Session recovery parameters.
 * @param {string} params.token - Session token.
 * @param {Object} [handlers={}] - Optional handlers for API response 
 * (success, error, finally).
 * 
 * @returns {void}
 */
function recoverSession(params = {}, handlers = {}) {
  api({ 
    'api' : 'recover_session',
    'data': { 
      'token': params.token }, 
    'handler': createHandler(handlerWrapper(handlers)) }); };

/**
 * Sends a request to the server to close the current user session.
 *
 * @param {Object} [handlers={}] - Optional handlers for API response (success, error, finally).
 *
 * @returns {void}
 */
function logOut(handlers = {}) {
  api({
    'api': 'log_out',
    'data': {},
    'handler': createHandler(handlerWrapper(handlers)) }); };