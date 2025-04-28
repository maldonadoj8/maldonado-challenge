/*==============================================================================
------------------------------------- Defs -------------------------------------
==============================================================================*/
/**
 * @typedef {Object} ApiResponse
 * @property {string} api - The API endpoint or action name.
 * @property {number|string} messageId - The unique identifier for the 
 * request/response pair.
 * @property {boolean} [success] - Indicates if the operation was successful.
 * @property {string} [description] - Human-readable message about the result.
 * @property {Object} [data] - The payload of the response (e.g., records, user 
 * info, etc.).
 * @property {string|Object} [error] - Error message or object if the operation 
 * failed.
 */

/*==============================================================================
----------------------------------- Imports ------------------------------------
==============================================================================*/

/*--------------------------------- Express ----------------------------------*/
import express from 'express';

/*----------------------------------- Node -----------------------------------*/
import { createServer } from 'http';

/*----------------------------------- Cors -----------------------------------*/
import cors from 'cors';

/*------------------------------------ Ws ------------------------------------*/
import { WebSocketServer } from 'ws';

/*----------------------------------- API ------------------------------------*/
import { login, edit_profile, recover_session, log_out } from './api.js';

/*==============================================================================
---------------------------------- Constants -----------------------------------
==============================================================================*/
const PORT = 3000;

/*==============================================================================
------------------------------------ Server ------------------------------------
==============================================================================*/

/*------------------------------ Configuration -------------------------------*/
// Create an Express application.
const APP = express();

// Enable CORS for all routes.
APP.use(cors());

// Create an HTTP server.
const HTTP_SERVER = createServer(APP);

// Create a WebSocket server.
const WEBSOCKET_SERVER = new WebSocketServer({ server: HTTP_SERVER });

/*----------------------------- WebSocket events -----------------------------*/
WEBSOCKET_SERVER.on('connection', (ws) => { 
  console.log('New client connected');

  /*---------------------------- On message event ----------------------------*/
  ws.on('message', async (message) => {
    // Log the received message.
    console.log('Received:', message.toString());

    // Parse the message as JSON.
    let request;
    try {
      request = JSON.parse(message.toString()); } 
    catch (e) {
      ws.send(JSON.stringify({ error: 'Invalid JSON' }));
      return; }

    // Prepare the response object.
    let response = {
      'api'        : request.api,
      'messageId'  : request.messageId,
      'success'    : false,
      'description': '',
      'data'       : {} };

    // Handle API requests.
    switch (request.api) {

      /*------------------------------- Login --------------------------------*/
      case 'login': {
        const result = await login(request.data.email, request.data.password);

        response.data        = result.data || {};
        response.success     = !!result.success;
        response.description = result.description || (result.success ? 'Login successful.' : 'Login failed.');

        if(!result.success && result.error) { 
          response.error = result.error; }
        if(result.success && result.user && result.user.guid) {
          ws.userGuid = result.user.guid; }
        break; }

      /*-------------------------- Recover Session ---------------------------*/
      case 'recover_session': {
        const result = await recover_session(request.data.token);

        response.data        = result.data || {};
        response.success     = !!result.success;
        response.description = result.description || (result.success ? 'Session recovered.' : 'Session recovery failed.');

        if(!result.success && result.error) { 
          response.error = result.error; }
        if(result.success && result.user && result.user.guid) {
          ws.userGuid = result.user.guid; }
        break; }

      /*---------------------------- Edit Profile ----------------------------*/
      case 'edit_profile': {
        if(!ws.userGuid) {
          response.success     = false;
          response.description = 'Not authenticated.';
          response.error       = 'Not authenticated.'; } 
        else {
          const result = await edit_profile(ws.userGuid, request.data.field, request.data.value);

          response.data        = result.data || {};
          response.success     = !!result.success;
          response.description = result.description || (result.success ? 'Profile updated.' : 'Profile update failed.');

          if(!result.success && result.error) { 
            response.error = result.error; }}
        break; }

      /*------------------------------ Log Out -------------------------------*/
      case 'log_out': {
        console.log(ws.userGuid);
        if(!ws.userGuid) {
          response.success     = false;
          response.description = 'Not authenticated.';
          response.error       = 'Not authenticated.'; }
        else {
          log_out(ws.userGuid);
          ws.userGuid          = undefined;
          response.success     = true;
          response.description = 'Session closed.';
          response.data        = {}; }
        break; }

      /*-------------------------------- Ping --------------------------------*/
      case 'ping': 
        response.success     = true;
        response.description = 'pong';
        response.data        = {};
        break;

      /*------------------------------ Default -------------------------------*/
      default:
        response.success     = false;
        response.description = 'Unknown API.';
        response.error       = 'Unknown API';
        response.data        = {};
    }

    ws.send(JSON.stringify(response)); });
    
  /*----------------------------- On close event -----------------------------*/
  ws.on('close', () => {
    console.log('Client disconnected'); }); });

// Start the server.
HTTP_SERVER.listen(PORT, () => {
  console.log(`WebSocket server running on port ${PORT}`); });