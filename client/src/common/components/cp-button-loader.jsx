/*==============================================================================
----------------------------------- Imports ------------------------------------
==============================================================================*/

/*--------------------------------- React -----------------------------------*/
// React modules.
import React from 'react';

/*----------------------------------- MUI ------------------------------------*/
import { Button, CircularProgress } from '@mui/material';

// MUI Icons.
import { CheckCircle, Error } from '@mui/icons-material';

/*==============================================================================
---------------------------------- Component -----------------------------------
==============================================================================*/
/**
 * Generic button that displays a loader and state indicators based on one or 
 * more fields of the API request state.
 *
 * This component receives the global state of the requests (apiState) and an 
 * array of keys (tickets) to monitor. If any of the requests are in progress, 
 * a loader is displayed.
 * 
 * If any request completed successfully or with an error, the corresponding 
 * icon is displayed. Additionally, it allows disabling the button if the 
 * `disableIfEmpty` prop is passed as true, combining it with the disable 
 * condition from the apiState.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.apiState - Object with the state of the API requests.
 * @param {string[]} props.tickets - Array of keys (tickets) to monitor in the 
 * apiState.
 * @param {boolean} [props.additionalDisabled=false] - If true, the button is 
 * disabled, in addition to the conditions from the apiState.
 * @param {React.ReactNode} props.children - Button content (e.g., text).
 * @param {boolean} [props.onlyDisable=false] - If true, the TextField is 
 * disabled without adding a loader.
 * @param {Object} [props] - Additional props to be passed to the Button 
 * component.
 *
 * @returns {React.ReactNode} Button that displays loader and state indicators 
 * based on the apiState.
 */
function CpButtonLoader({ apiState, tickets, children, 
additionalDisabled = false, onlyDisable = false, ...props }) {

  /*------------------------------- Variables --------------------------------*/
  // Accumulated states of the API calls.
  let processing = false;
  let success    = false;
  let error      = false;

  // Iterate over each ticket and accumulate the states.
  tickets.forEach((key) => {
    const state = apiState?.[key];
    if (state) {
      if(state.processing) { 
        processing = true; }
      if(state.success) { 
        success = true; }
      if(state.error) { 
        error = true; }}});

  /*================================== JSX ===================================*/
  return (
    <Button
    disabled={props.disabled || processing || additionalDisabled}
    endIcon={
      !onlyDisable &&
        <>
          {processing && <CircularProgress size={20} />}
          {!processing && success && <CheckCircle color="success" />}
          {!processing && error && <Error color="error" />}
        </>
    }
    {...props}>
      {children}
    </Button>
  );
};

export default CpButtonLoader;
