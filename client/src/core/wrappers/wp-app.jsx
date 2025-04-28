/*==============================================================================
----------------------------------- Imports ------------------------------------
==============================================================================*/

/*---------------------------------- React -----------------------------------*/
// React modules.
import React from 'react';

// React Router modules.
import { Navigate } from 'react-router';

/*---------------------------------- Hooks -----------------------------------*/
// useCxApp custom hook.
import { useCxApp } from '../providers/pv-app.jsx';

/*-------------------------------- Components --------------------------------*/
// VwConnecting view.
import VwConnecting from '../../common/views/vw-connecting.jsx';

/*==============================================================================
---------------------------------- Component ----------------------------------
==============================================================================*/
/**
 * Component that acts as a wrapper for the application and manages 
 * authentication.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components to render inside 
 * the wrapper.
 * @param {boolean} props.authRequired - Whether authentication is required for 
 * the wrapped layout.
 * 
 * @returns {React.ReactNode}
 */
function WpApp({ children, authRequired }) {

  /*-------------------------------- useCxApp --------------------------------*/
  const {
    authentication,
    connection,
  } = useCxApp();

  // If not connected or authentication is pending, show the Connecting view.
  if(connection === window.CONN_STATE.PENDING 
    || authentication === window.AUTH_STATE.PENDING) {
    return <VwConnecting />; }

  // If the wrapper is wrapping a layout that requires authentication.
  if(authRequired) {
    // If not authenticated, redirect to authentication page.
    if(authentication === window.AUTH_STATE.UNAUTHENTICATED) {
      return <Navigate to="/auth" replace />; }} 
  else {
    // If the user is authenticated but the layout does not require 
    // authentication, redirect to home page.
    if(authentication === window.AUTH_STATE.AUTHENTICATED) {
      return <Navigate to="/" replace />; }}

  // If none of the above conditions are met, render the children components.
  return children;
}

export default WpApp;