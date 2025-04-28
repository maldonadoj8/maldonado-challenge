/*==============================================================================
----------------------------------- Imports ------------------------------------
==============================================================================*/

/*--------------------------------- React -----------------------------------*/
// React modules.
import React from 'react';

/*----------------------------------- MUI ------------------------------------*/
// MUI components.
import { TextField, InputAdornment, CircularProgress } from '@mui/material';

// MUI icons.
import { CheckCircle, Error } from '@mui/icons-material';

/*==============================================================================
---------------------------------- Component ----------------------------------
==============================================================================*/
/**
 * Generic TextField that shows a loader and state indicators based on one or 
 * more fields of the API request state.
 *
 * This component receives the global state of the requests (apiState) and an 
 * array of keys (tickets) to monitor. 
 * 
 * If any of the requests are in progress, a loader is displayed. If any 
 * finished successfully or failed, the corresponding icon is displayed.
 * 
 * Additionally, it allows disabling the TextField if the `additionalDisabled` 
 * prop is passed as true, combining it with the disabling condition from 
 * apiState.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.apiState - Object with the state of the API requests.
 * @param {string[]} props.tickets - Array of keys (tickets) to monitor in 
 * apiState.
 * @param {boolean} [props.additionalDisabled=false] - If true, disables the 
 * TextField, in addition to the conditions from apiState.
 * @param {boolean} [props.onlyDisable=false] - If true, disables the TextField, 
 * without adding a loader.
 * @param {Object} [props] - Other props to be passed to the TextField component.
 *
 * @returns {React.ReactNode} TextField that shows loader and state indicators 
 * based on apiState.
 */
function CpTextFieldLoader({ apiState, tickets, 
additionalDisabled = false, onlyDisable = false, ...props }) {

  /*------------------------------- Variables --------------------------------*/
  let processing = false;
  let success    = false;
  let error      = false;

  // Iterate over each ticket and accumulate states.
  tickets.forEach((key) => {
    const state = apiState?.[key];
    if(state) {
      if(state.processing) {
        console.error('processing', processing);
        processing = true; }
      if(state.success) {
        success = true; }
      if(state.error) {
        error = true; }}});

  /*================================== JSX ===================================*/
  return (
    <TextField 
    disabled={props.disabled || processing || additionalDisabled} 
    {...props} 
    slotProps={{
      input: {
        endAdornment: !onlyDisable && (
          <InputAdornment position="end">
            {processing && <CircularProgress size={20} />}
            {!processing && success && <CheckCircle color="success" />}
            {!processing && error && <Error color="error" />}
          </InputAdornment>
        )}}}
    />
  );
};

export default CpTextFieldLoader;