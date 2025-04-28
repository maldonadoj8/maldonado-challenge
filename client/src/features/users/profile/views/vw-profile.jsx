/*==============================================================================
----------------------------------- Imports ------------------------------------
==============================================================================*/

/*---------------------------------- React -----------------------------------*/
// React modules.
import React, {
  useCallback
} from 'react';

/*----------------------------------- MUI ------------------------------------*/
// MUI components.
import { Button, Typography } from '@mui/material';

/*==============================================================================
---------------------------------- Component -----------------------------------
==============================================================================*/
function VwProfile() {
  
  /*-------------------------------- Handlers --------------------------------*/
  /**
   * 
   */
  const handlerOnClickButtonTerminarSesion = useCallback(() => {
    window.Session.logOut({
      'success': (message) => {
        window.LS.removeSessionToken();
        console.log('Logout successfully:', message);
        window.location.reload();
      },
      'error'  : (error) => {
        console.error('Logout error:', error);
      },
      'finally': () => {
        console.log('Logout request completed');
      },  
    })
  }, []);

  /*================================== JSX ===================================*/
  return (
    <>
      
      {/*------------------------------ Title -------------------------------*/}
      <Typography>
        Profile view.
      </Typography>

      <Button 
      onClick={handlerOnClickButtonTerminarSesion}>
        Close session
      </Button>
    </>
  );
};

export default VwProfile;