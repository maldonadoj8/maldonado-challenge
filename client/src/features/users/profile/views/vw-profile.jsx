/*==============================================================================
----------------------------------- Imports ------------------------------------
==============================================================================*/

/*---------------------------------- React -----------------------------------*/
// React modules.
import React, {
  useCallback, 
  useMemo, 
  useState
} from 'react';

/*---------------------------------- Utils -----------------------------------*/
// Function utilities.
import { debounceImmediate } from '../../../../utils/ut-function.js';

// API utilities.
import { createApiWithState } from '../../../../utils/ut-api.js';

/*--------------------------------- Context ----------------------------------*/
// Custom hook useCxApi.
import { useCxApi } from '../../../../core/providers/pv-api.jsx';

/*----------------------------------- MUI ------------------------------------*/
// MUI components.
import { Stack } from '@mui/material';

/*-------------------------------- Components --------------------------------*/
// Component CpButtonLoader.
import CpButtonLoader from '../../../../common/components/cp-button-loader.jsx';

// Component CpCardUser.
import CpCardUser from '../components/cp-card-user.jsx';

// Component CpCardEditUser.
import CpCardEditUser from '../components/cp-card-edit-user.jsx';

/*==============================================================================
---------------------------------- Component -----------------------------------
==============================================================================*/
function VwProfile() {
  
  /*-------------------------------- useCxApi ---------------------------------*/
  // API call state.
  const { apiState, apiStateHandler } = useCxApi();

  /*-------------------------------- useState --------------------------------*/
  // Is currently editing the profile.
  const [editing, setEditing] = useState(false);

  /*------------------------------- Constants --------------------------------*/
  const USER = Object.values(window.Database.DATAB_BASE.USER).find(
    (user) => user.id === window.CurrentUser.id);

  /*---------------------------------- APIs ----------------------------------*/
  /**
   * Login API call.
   */
  const apiSessionLogout = useMemo(() =>
    createApiWithState({
      'func'   : window.Session.logOut,
      'handler': apiStateHandler,
      'ticket' : 'Session.logout'}), [apiStateHandler]);

  /*-------------------------------- Handlers --------------------------------*/
  /**
   * OnClick handler for the logout button.
   */
  const handleLogoutClick = debounceImmediate(useCallback(() => {
    apiSessionLogout({
      'success': (message) => {
        window.LS.removeSessionToken();
        console.log('Logout successfully:', message);
        window.location.reload(); },
      'error'  : (error) => {
        console.error('Logout error:', error); },
      'finally': () => {
        console.log('Logout request completed'); }});
  }, [apiSessionLogout]), 1000);
  
  /*================================== JSX ===================================*/
  return (
    /*------------------------------ Container -------------------------------*/
    <Stack 
    gap={2}>

      {/*-------------------------- Sub container ---------------------------*/}
      <Stack 
      direction="row" 
      gap={2}>

        {/*-------------------------- Edit profile --------------------------*/}
        <CpButtonLoader 
        onClick={() => setEditing(!editing)} 
        tickets={[]} 
        apiState={apiState} 
        variant="contained" 
        size="small" 
        fullWidth 
        sx={{
          backgroundColor: 'grey.200' }}>
          {editing ? 'Done' : 'Edit'}
        </CpButtonLoader>

        {/*----------------------------- Logout -----------------------------*/}
        <CpButtonLoader 
        onClick={handleLogoutClick} 
        tickets={['Session.logout']} 
        apiState={apiState} 
        variant="contained" 
        size="small" 
        fullWidth 
        sx={{
          backgroundColor: 'grey.200' }}>
          Log out
        </CpButtonLoader>
      </Stack>

      {/*---------------------------- User card -----------------------------*/}
      {
        editing && USER
          ? <CpCardEditUser user={USER} />
          : <CpCardUser user={USER} />
      }      
    </Stack>
  );
};

export default VwProfile;