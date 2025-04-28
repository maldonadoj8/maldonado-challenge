/*==============================================================================
------------------------------------- Defs -------------------------------------
==============================================================================*/
/**
 * @typedef {Object} LOCAL_DATABASE
 * @property {Object.<string|number, USER>} USER
 * USER table.
 * 
 * @property {Object.<string|number, SESSION>} SESSION
 * SESSION table.
 */

/*==============================================================================
----------------------------------- Database -----------------------------------
==============================================================================*/
/**
 * The local database object.
 * 
 * @type {LOCAL_DATABASE}
 */
export const DATAB_BASE = {
  USER   : {},
  SESSION: {}
};

/*==============================================================================
---------------------------------- Functions -----------------------------------
==============================================================================*/
/**
 * Classifies a record and puts it in the correct table (USER or SESSION).
 * Replaces the whole object if necessary (no version management).
 * 
 * @param {Object} record - The record to classify. Must have id, id_entity, and 
 * active.
 * 
 * @returns {Object|null} - Change detected or null if not classified.
 */
export function classify_record(record) {
  if(!record || typeof record !== 'object' || !('id' in record) 
    || !('id_entity' in record)) {
    return null; }
  let entityMap = { 1: 'USER', 2: 'SESSION' };
  let table = entityMap[record.id_entity];
  if(!table || !(table in DATAB_BASE)) { 
    return null; }
  let id       = record.id.toString();
  let tableRef = DATAB_BASE[table];
  let prev     = tableRef[id];
  if(!prev) {
    tableRef[id] = record;
    return { 
      'type': 'INSERT', 
      record }; } 
  else {
    tableRef[id] = record;
    return { 
      'type': 'UPDATE', 
      record }; }};

/**
 * Classifies all records in a data object and puts them in the correct tables.
 * 
 * @param {Object} data - Object with arrays of records (e.g., { USER: [r1, r2], 
 * SESSION: [r3] })
 * 
 * @returns {Object} - Changes detected per table.
 */
export function classifyRecords(data) {
  let changes = {};
  for(let table in data) {
    if(!Array.isArray(data[table])) {
      continue; }
    changes[table] = [];
    for(let rec of data[table]) {
      let res = classify_record(rec);
      if(res) {
        changes[table].push(res); }}}
  return changes; };

/**
 * Wrapper for creating API handlers that classify records after a response.
 *
 * This function takes an object with success and error handler functions, 
 * and injects logic to classify and update the local database tables 
 * (USER, SESSION) based on the data returned in the API response.
 *
 * @param {Object} handlers - An object containing handler functions for API 
 * responses.
 * @param {function(Object, Object):void} [handlers.success] - Function to 
 * handle successful API responses. Receives (response, classifiedChanges).
 * @param {function(Object, Object):void} [handlers.error] - Function to 
 * handle failed API responses. Receives (response, classifiedChanges).
 * 
 * @returns {Object} - The handlers object with injected classification logic 
 * for success and error.
 */
export function handlerWrapper(handlers) {
  let _success   = handlers.success;
  let _error     = handlers.error;
  let classified = {};
  // Replace the success and error handlers with new ones that classify records.
  handlers.success = (message) => {
    classified = classifyRecords(message.data);
    if(typeof _success === 'function') { 
      _success(message, classified); }};
  handlers.error = (message) => {
    classified = classifyRecords(message.data);
    if(typeof _error === 'function') { 
      _error(message, classified); }};
  return handlers; };