/*==============================================================================
----------------------------------- Imports ------------------------------------
==============================================================================*/

/*--------------------------------- Express ---------------------------------*/
import express from 'express';

/*----------------------------------- Node -----------------------------------*/
import { createServer } from 'http';

/*----------------------------------- Cors -----------------------------------*/
import cors from 'cors';

/*------------------------------------ Ws ------------------------------------*/
import { WebSocketServer } from 'ws';

/*----------------------------------- API ------------------------------------*/
import { login, edit_profile, recover_session } from './api.js';

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
      'api'   : request.api,
      'ticket': request.ticket
    };

    // Handle API requests.
    switch (request.api) {

      /*------------------------------- Login --------------------------------*/
      case 'login': {
        const result = await login(request.data.email, request.data.password);
        response.data = result;
        if(result.success) {
          ws.userEmail = result.user.email; }
        break; }

      /*-------------------------- Recover Session ---------------------------*/
      case 'recover_session': {
        const result = await recover_session(request.data.token);
        response.data = result;
        if(result.success) {
          ws.userEmail = result.user.email; }
        break; }

      /*---------------------------- Edit Profile ----------------------------*/
      case 'edit_profile': {
        if(!ws.userEmail) {
          response.data = { success: false, error: 'Not authenticated' }; } 
        else {
          const result = await edit_profile(ws.userEmail, request.data.newProfile);
          response.data = result; }
        break; }

      /*-------------------------------- Ping --------------------------------*/
      case 'ping': 
        response.data = { success: true, message: 'pong' };
        break;

      /*------------------------------ Default -------------------------------*/
      default:
        response.data = { success: false, error: 'Unknown API' }; }

    ws.send(JSON.stringify(response)); });
    
  /*----------------------------- On close event -----------------------------*/
  ws.on('close', () => {
    console.log('Client disconnected'); }); });

// Start the server.
HTTP_SERVER.listen(PORT, () => {
  console.log(`WebSocket server running on port ${PORT}`); });