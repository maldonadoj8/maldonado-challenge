/*==============================================================================
----------------------------------- Imports ------------------------------------
==============================================================================*/

/*---------------------------------- React -----------------------------------*/
// React modules.
import React, { 
  useCallback,
  useEffect, 
  useState } from 'react';

/*----------------------------------- MUI ------------------------------------*/
// MUI components.
import { Snackbar, Alert } from '@mui/material';

/*==============================================================================
---------------------------------- Component -----------------------------------
==============================================================================*/
/** 
 * CpSnackBar Component. 
 */
function CpSnackBar() {
  
  /*-------------------------------- useState --------------------------------*/
  // State to store snackbar component data.
  const [snackbar, setSnackbar] = useState({
    'open'     : false,
    'message'  : '',
    'severity' : 'info' });

  /*-------------------------------- Methods ---------------------------------*/
  /**
   * Shows the snackbar.
   * 
   * @param {*} message Message to show in the snackbar.
   * @param {*} severity Snackbar severity level.
   * 
   * @returns {void}
   */
  const showSnackbar = useCallback((message, severity = 'info') => {
    setSnackbar({
      'open'     : true,
      'message'  : message,
      'severity' : severity }); 
  }, []);

  /*-------------------------------- Handlers --------------------------------*/
  /**
   * Handler for snackbar onClose event.
   */
  const handleOnCloseSnackbar = useCallback(() => {
    setSnackbar({ ...snackbar, 'open': false }); 
  }, [snackbar]);

  /*------------------------------- UseEffect --------------------------------*/
  /** 
   * Effect that runs on mount, assigns the showSnackbar method to the global variable window.showSnackbar.
   */
  useEffect(() => {
    window.showSnackbar = showSnackbar;
  }, [showSnackbar]);
  
  /*================================== JSX ===================================*/
  return (
    
    /*------------------------------- Snackbar -------------------------------*/
    <Snackbar 
    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} 
    autoHideDuration={6000} 
    onClose={handleOnCloseSnackbar} 
    open={snackbar.open}>
      
      {/*------------------------------ Alert -------------------------------*/}
      <Alert 
      onClose={handleOnCloseSnackbar} 
      severity={snackbar.severity} 
      variant="filled" 
      sx={{ 
        backgroundColor: 'text.primary',
        width          : '100%' }}>
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
};

export default CpSnackBar;