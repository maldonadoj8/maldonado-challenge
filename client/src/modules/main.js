/*==============================================================================
----------------------------------- Imports ------------------------------------
==============================================================================*/

/*---------------------------------- Model -----------------------------------*/
import * as Model from './model.js';

/*--------------------------------- Database ---------------------------------*/
import * as Database from './database.js';

/*---------------------------------- Server ----------------------------------*/
import * as Server from './server.js';

/*---------------------------------- User ------------------------------------*/
import * as User from './user.js';

/*--------------------------------- Sesion -----------------------------------*/
import * as Sesion from './sesion.js';

/*--------------------------------- Local Storage ---------------------------*/
import * as LocalStorage from './local-storage.js';

/*==============================================================================
----------------------------------- Exports ------------------------------------
==============================================================================*/
window.Model    = Model;
window.Database = Database;
window.Server   = Server;
window.User     = User;
window.Session  = Sesion;
window.LS       = LocalStorage;

/*==============================================================================
------------------------------------ Config ------------------------------------
==============================================================================*/
/**
 * Configures the main module.
 */
export function config() {
  // Adds the server handlers for each entity in the model.
  addEntityHandlers();
  // Set the current user from localStorage.
  window.CurrentUser = LocalStorage.getCurrentUser();
  // Set the visual feedback debug.
  Server.setShowMessage((message) => {
    window.showSnackbar(message.description ?? 'Received message'); }); }

/*==============================================================================
---------------------------------- Functions -----------------------------------
==============================================================================*/
/**
 * Connects to the server and attempts to recover the session using the token
 * from local storage.
 *
 * @param {Object} handlers - Optional handlers for connection and session 
 * recovery events.
 * @param {function():void} [handlers.onOpenConnection] - Called when the server 
 * connection is opened.
 * @param {function():void} [handlers.onCloseConnection] - Called when the 
 * server connection is closed.
 * @param {function(Object, Object):void} [handlers.success] - Called on 
 * successful session recovery.
 * @param {function(Object, Object):void} [handlers.error] - Called on failed 
 * session recovery.
 * @param {function(Object, Object):void} [handlers.finally] - Called after 
 * session recovery attempt (success or error).
 */
export function connectAndRecoverSession(handlers = {}) {
  const token = LocalStorage.getSessionToken();
  Server.setOnOpenConnection(() => {
    if(handlers.onOpenConnection 
      && typeof handlers.onOpenConnection === 'function') {
      handlers.onOpenConnection(); }
      Sesion.recoverSession({'token': token ?? ''}, handlers); });
  Server.setOnCloseConnection(() => {
    if(handlers.onCloseConnection 
      && typeof handlers.onCloseConnection === 'function') {
      handlers.onCloseConnection(); }});
  // Forces the server connection.
  Server.ping(); }

/**
 * Adds a handler for each entity in the model.
 * When data for an entity arrives from the server, it is stored in the local 
 * database.
 */
export function addEntityHandlers() {
  for(let key in Model.ENTITY) {
    const entity = Model.ENTITY[key];
    Server.addHandler(
      entity.NAME,
      'main',
      (message) => {
        // Store all received records in the local DB.
        if(message && message.data) {
          for(const id in message.data) {
            Database.DATAB_BASE[entity.NAME][id] = message.data[id]; }}}); }};