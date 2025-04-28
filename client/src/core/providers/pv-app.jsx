/*==============================================================================
------------------------------------ Types -------------------------------------
==============================================================================*/
/**
 * Defines the different authentication states in the application.
 *
 * @typedef {Object} AuthState
 * @property {null} PENDING - Represents an indeterminate state where the 
 * session has not yet been verified.
 * @property {boolean} AUTHENTICATED - Indicates that the user has established a 
 * valid session on the server.
 * @property {boolean} UNAUTHENTICATED - Indicates that the user does not have a 
 * valid session on the server.
 */

/**
 * Defines the different connection states in the application.
 *
 * @typedef {Object} ConnState
 * @property {null} PENDING - Represents an indeterminate state where the 
 * connection has not yet been verified.
 * @property {boolean} CONNECTED - Indicates that the application has 
 * established an active connection with the server.
 * @property {boolean} DISCONNECTED - Indicates that the connection to the 
 * server has been interrupted or could not be established.
 */

/*==============================================================================
----------------------------------- Imports ------------------------------------
==============================================================================*/

/*---------------------------------- React -----------------------------------*/
// React modules.
import React, { 
  createContext, 
  useContext, 
  useEffect, 
  useState } from 'react';

/*================================== Utils ===================================*/
import * as Server from '../../utils/server.js';

/*==============================================================================
------------------------------------- Defs -------------------------------------
==============================================================================*/
/** 
 * @type {AuthState}
 */
window.AUTH_STATE = {
  PENDING        : null,
  AUTHENTICATED  : true,
  UNAUTHENTICATED: false };

/** 
 * @type {ConnState}
 */
window.CONN_STATE = {
  PENDING     : null,
  CONNECTED   : true,
  DISCONNECTED: false };

/** 
 * Context that provides and consumes the necessary information for the correct 
 * functioning of the App.
 * 
 * @type {React.Context}
 */
const CxApp = createContext();

/** 
 * Custom hook that provides direct access to the App context.
 * 
 * @function useCxApp
 * 
 * @returns {Object} The current value of the context.
 */
export function useCxApp() {
  return useContext(CxApp); };

/*==============================================================================
---------------------------------- Component ----------------------------------
==============================================================================*/
/** 
 * Component that acts as a provider for the application context.
 * Wraps and provides child components with the context and functions 
 * necessary for the correct functioning of the App.
 * 
 * @component PvApp
 * @param {...React.ReactNode} children - Child components that will have access 
 * to the App context.
 * 
 * @returns {React.ReactNode} Returns a component that wraps the children with 
 * the App context.
 */
function PvApp({ children }) {

  /*-------------------------------- useState --------------------------------*/
  /** 
   * @state authentication
   * Represents the user's authentication state. Initially set to 'PENDING' 
   * until the authentication state is determined.
   * @function setAuthentication Function to update the authentication state.
   */
  const [authentication, setAuthentication] = 
  useState(window.AUTH_STATE.UNAUTHENTICATED);

  /** 
   * @state connection
   * Represents the platform connection state. Initially set to 'PENDING' until 
   * the connection state is determined.
   * @function setConnection Function to update the connection state.
   */
  const [connection, setConnection] = useState(window.CONN_STATE.PENDING);

  /*---------------------------------- APIs ----------------------------------*/

  /*------------------------------- useEffect --------------------------------*/
  useEffect(() => {
    Server.setOnOpenConnection(() => {
      Server.login('asdasd', 'asdasd');
      setConnection(window.CONN_STATE.CONNECTED); });
    Server.ping();
  }, []);

  /*================================== JSX ===================================*/
  return (
    <CxApp.Provider 
    value={{ 
      connection, 
      authentication, 
      setAuthentication
    }}>
      {children}
    </CxApp.Provider>
  );
};

export default PvApp;