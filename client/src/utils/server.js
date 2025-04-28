/*==============================================================================
----------------------------------- Imports ------------------------------------
==============================================================================*/

/*==============================================================================
----------------------------------- Exports ------------------------------------
==============================================================================*/
export { 
  connectWebSocket, 
  disconnectWebSocket,
  sendMessage,
  
  setOnOpenConnection,
  setOnCloseConnection,
  setOnMessageReceived,
  setOnErrorReceived, 
  
  ping, 
  login,
  editProfile,
  recoverSession };

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
    console.log('WebSocket message received');
    console.log(e); }
  if(typeof onMessageReceived === 'function') {
    onMessageReceived(e); }};

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
----------------------------------- Functions ----------------------------------
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
  let api     = params.api;
  let data    = params.data ?? {};
  let ticket  = Math.floor(Math.random() * (1000000000000 - 0 + 1) + 0);
  let request = { api, ticket, data };
  sendMessage(request); };

function ping() {
  api({ 'api': 'ping' }); };
  
function login(email, password) {
  api({ 'api': 'login', 'data': { email, password } }); }

function editProfile(field, value) {
  api({ 'api': 'edit_profile', 'data': { field, value } }); }

function recoverSession(token) {
  api({ 'api': 'recover_session', 'data': { token } }); }