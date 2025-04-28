/*==============================================================================
----------------------------------- Exports ------------------------------------
==============================================================================*/
export { 
  api, 
  
  connectWebSocket, 
  disconnectWebSocket,
  sendMessage,
  
  setOnOpenConnection,
  setOnCloseConnection,
  setOnMessageReceived,
  setOnErrorReceived, 
  setShowMessage,
  
  ping,
  addHandler,
  removeHandler,
  createHandler };

/*==============================================================================
---------------------------------- Constants -----------------------------------
==============================================================================*/
let WS_URL  = 'localhost';
let WS_PORT = '3000';

/*==============================================================================
---------------------------------- Variables -----------------------------------
==============================================================================*/
let debug = true;

let webSocket = null;

let automaticReconection = true;

/*==============================================================================
------------------------------------ Debug -------------------------------------
==============================================================================*/
function debug_p() {
  return debug; }

/**
 * Shows a message received in a response object.
 *
 * @param {Object} message - Response received from the server.
 */
function _showMessage(message) {
  if(debug_p()) {
    console.log(`Message: ${message.description}`); }
  if(typeof showMessage === 'function') {
    showMessage(message); }};

/**
 * Hook for handling a message received in a response object.
 */
let showMessage = () => {};

/**
 * Sets the function to use when a response of type MESSAGE is received.
 *
 * @param {function} fn - The function to execute.
 * @return {function} The function to execute.
 */
function setShowMessage(fn) {
  showMessage = fn;
  return fn; };

/*==============================================================================
----------------------------------- Handlers -----------------------------------
==============================================================================*/

/*---------------------------- On open connection ----------------------------*/
/**
 * Handler for WebSocket connection open event.
 * 
 * @param {*} e - WebSocket event.
 */
function _onOpenConnection(e) {
  if(debug_p()) {
    console.log('WebSocket connected'); 
    console.log(e); }
  if(typeof onOpenConnection === 'function') {
    onOpenConnection(e); }};

/**
 * Alternative handler for WebSocket connection open event.
 */
let onOpenConnection = () => {};

/**
 * Alternative handler setter.
 * 
 * @param {Function} fn - Function.
 * 
 * @returns {Function}
 */
function setOnOpenConnection(fn) {
  onOpenConnection = fn;
  return fn; };

/*--------------------------- On close connection ----------------------------*/
/**
 * Handler for WebSocket connection close event.
 * 
 * @param {*} e - WebSocket event.
 */
function _onCloseConnection(e) {
  if(debug_p()) {
    console.log('WebSocket closed');
    console.log(e); }
  if(typeof onCloseConnection === 'function') {
    onCloseConnection(e); }
  if(automaticReconection) {
      setTimeout(() => { connectWebSocket(); }, 10000); }};

/**
 * Alternative handler for WebSocket connection close event.
 */
let onCloseConnection = () => {};

/**
 * Alternative handler setter for close connection.
 * 
 * @param {Function} fn - Function.
 * 
 * @returns {Function}
 */
function setOnCloseConnection(fn) {
  onCloseConnection = fn;
  return fn; };

/*--------------------------- On message received ----------------------------*/
/**
 * Handler for WebSocket message event.
 * 
 * @param {*} e - WebSocket message event.
 */
function _onMessageReceived(e) {
  if(debug_p()) {
    console.log('WebSocket message received'); }
  if(typeof onMessageReceived === 'function') {
    onMessageReceived(e); }
  try {
    const msg = JSON.parse(e.data);
    console.log(msg);
    if(msg.api) {
      callHandlers(msg.api, msg); }} 
  catch (err) {
    if(debug_p()) {
      console.error('Failed to parse server message', err); }}};

/**
 * Alternative handler for WebSocket message event.
 */
let onMessageReceived = () => {};

/**
 * Alternative handler setter for message received.
 * 
 * @param {Function} fn - Function.
 * 
 * @returns {Function}
 */
function setOnMessageReceived(fn) {
  onMessageReceived = fn;
  return fn; };

/*---------------------------- On error received -----------------------------*/
/**
 * Handler for WebSocket error event.
 * 
 * @param {*} e - WebSocket error event.
 */
function _onErrorReceived(e) {
  if(debug_p()) {
    console.log('WebSocket error received');
    console.log(e); }
  if(typeof onErrorReceived === 'function') {
    onErrorReceived(e); }}

/**
 * Alternative handler for WebSocket error event.
 */
let onErrorReceived = () => {};

/**
 * Alternative handler setter for error received.
 * 
 * @param {Function} fn - Function.
 * 
 * @returns {Function}
 */
function setOnErrorReceived(fn) {
  onErrorReceived = fn;
  return fn; }

/*==============================================================================
---------------------------------- Functions -----------------------------------
==============================================================================*/
function connectWebSocket () {
  if(webSocket && (webSocket.readyState === webSocket.OPEN || webSocket.readyState === webSocket.CONNECTING)) {
    return; }
  if(debug_p()) { 
    console.log('Connecting WebSocket'); }
  try {
    webSocket           = new WebSocket(`ws://${WS_URL}:${WS_PORT}`);
    webSocket.onopen    = _onOpenConnection;
    webSocket.onclose   = _onCloseConnection;
    webSocket.onmessage = _onMessageReceived;
    webSocket.onerror   = _onErrorReceived; }
  catch(error) { 
    console.error(error); }};

function disconnectWebSocket () {
  if(webSocket && webSocket.readyState !== webSocket.CLOSED && webSocket.readyState !== webSocket.CLOSING) {
    webSocket.close(); }};

function sendMessage(data) {
  if(webSocket && webSocket.readyState === webSocket.OPEN) {
    let JSON_DATA = JSON.stringify(data);
    webSocket.send(JSON_DATA); }
  else {
    if(!webSocket || webSocket.readyState === webSocket.CLOSED || webSocket.readyState === webSocket.CLOSING) {
      setTimeout(() => { connectWebSocket(); }, 1000); }}};

function api(params) {
  let api       = params.api;
  let data      = params.data ?? {};
  let messageId = Math.floor(Math.random() * (1000000000000 - 0 + 1) + 0);
  let handler   = params.handler;
  if(handler) {
    addHandler(api, messageId, handler); }
  let request = { api, messageId, data };
  sendMessage(request); };

function ping() {
  api({ 'api': 'ping' }); };

/*==============================================================================
----------------------------------- Handlers -----------------------------------
==============================================================================*/
// The handlers object stores all handlers for different APIs.
const handlers = {};

/**
 * Adds a handler for a specific API message from the server.
 * 
 * @param {string} apiName - The API or entity name to handle.
 * @param {string|number} messageId - A unique message identifier.
 * @param {Function} handler - The function to handle the message.
 */
function addHandler(apiName, messageId, handler) {
  if(!handlers[apiName]) {
    handlers[apiName] = {}; }
  handlers[apiName][messageId] = handler; };

/**
 * Removes a handler for a specific API message.
 * 
 * @param {string} apiName - The API or entity name.
 * @param {string|number} messageId - The message identifier.
 */
function removeHandler(apiName, messageId) {
  if(handlers[apiName]) {
    delete handlers[apiName][messageId]; }};

/**
 * Calls handlers for a given API/entity name with the received message.
 * If a messageId is present in the message, only the handler registered with 
 * that messageId will be called.
 * If no messageId is present, all handlers for the API are called.
 * 
 * @param {string} apiName
 * @param {Object} message
 */
function callHandlers(apiName, message) {
  if(handlers[apiName]) {
    if(message.messageId && handlers[apiName][message.messageId]) {
      if(typeof handlers[apiName][message.messageId] === 'function') {
        handlers[apiName][message.messageId](message); }} 
    else {
      for(const id in handlers[apiName]) {
        if(typeof handlers[apiName][id] === 'function') {
          handlers[apiName][id](message); }}}}};

/**
 * Creates a simple handler for server messages.
 *
 * @param {Object} handlers - Handler configuration object.
 * @param {Function} [handlers.success] - Function to call if the response 
 * message is successful (message.success === true).
 * @param {Function} [handlers.error] - Function to call if the response message 
 * is not successful (message.success === false).
 * @param {Function} [handlers.finally] - Function to call after success or 
 * error handler, always runs.
 * 
 * @returns {Function} Handler function to process the server response.
 */
function createHandler(handlers = {}) {
  return function(message) {
    if(message.description) {
      _showMessage(message); }
    if(typeof handlers.success === 'function' && message?.success) {
      handlers.success(message); } 
    else if(typeof handlers.error === 'function' && !message?.success) {
      handlers.error(message); }
    if(typeof handlers.finally === 'function') {
      handlers.finally(message); }}; };