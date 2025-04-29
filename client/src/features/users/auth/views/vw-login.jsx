/*==============================================================================
----------------------------------- Imports ------------------------------------
==============================================================================*/

/*---------------------------------- React -----------------------------------*/
// React modules.
import React, { 
  useCallback,
  useMemo,
  useState } from 'react';

/*---------------------------------- Utils -----------------------------------*/
import { debounceImmediate } from '../../../../utils/ut-function.js';

import { createApiWithState } from '../../../../utils/ut-api.js';

/*--------------------------------- Context ----------------------------------*/
// Custom hook useCxApi.
import { useCxApi } from '../../../../core/providers/pv-api.jsx';

/*---------------------------------- Hooks -----------------------------------*/
// Hook for formatting inputs.
import { useCaptureFields } from '../../../../core/hooks/hk-data-capture.jsx';

/*----------------------------------- MUI ------------------------------------*/
// MUI components.
import { Box, Card, CardContent, CardHeader, Divider, Grid2, Stack, 
Typography} from '@mui/material';

/*------------------------------- Components --------------------------------*/
// Component CpButtonLoader.
import CpButtonLoader from '../../../../common/components/cp-button-loader.jsx';

// Component CpTextFieldLoader.
import CpTextFieldLoader 
from '../../../../common/components/cp-textfield-loader.jsx';

/*---------------------------------- Files -----------------------------------*/
// Logo image.
import logo from '../../../../assets/logo.png';

/*==============================================================================
---------------------------------- Component ----------------------------------
==============================================================================*/
/** 
 * Login view. 
 * 
 * @returns {React.ReactNode}
 */
export default function VwLogin() {

  /*-------------------------------- useCxApi --------------------------------*/
  // API call state.
  const { apiState, apiStateHandler } = useCxApi();

  /*-------------------------------- useState --------------------------------*/
  // State for login form data.
  const [loginData, setLoginData] = useState({
    'email'   : 'henderson.briggs@geeknet.net',
    'password': '23derd*334' });

  /*----------------------------- HkCaptureFields -----------------------------*/
  // Hook for formatting inputs.
  const {
    generateHandlers,
  } = useCaptureFields({
    'initialValues'   : loginData,
    'setExternalState': setLoginData,
  });

  /*---------------------------------- APIs ----------------------------------*/
  /**
   * Login API call.
   */
  const apiSessionLogin = useMemo(() =>
    createApiWithState({
      'func'   : window.Session.login,
      'handler': apiStateHandler,
      'ticket' : 'Session.login'}), [apiStateHandler]);

  /*-------------------------------- Handlers --------------------------------*/
  /**
   * Handlers for email field events.
   * 
   * @type {Object}
   * @property {Function} onChange - Handler for onChange event.
   * @property {Function} onKeyDown - Handler for onKeyDown event.
   * @property {Function} onBlur - Handler for onBlur event.
   */
  const handlersEmail = useMemo(() => generateHandlers('email'), [generateHandlers]);

  /**
   * Handlers for password field events.
   * 
   * @type {Object}
   * @property {Function} onChange - Handler for onChange event.
   * @property {Function} onKeyDown - Handler for onKeyDown event.
   * @property {Function} onBlur - Handler for onBlur event.
   */
  const handlersPassword = useMemo(() => generateHandlers('password'), [generateHandlers]);

  /**
   * OnClick handler for the login button.
   */
  const handleLoginClick = debounceImmediate(useCallback(() => {
    apiSessionLogin({
      'email'   : loginData.email,
      'password': loginData.password,
    }, {
      'success': (message) => {
        window.LS.setSessionToken(message.data.SESSION[0].token);
        window.LS.setCurrentUser(message.data.USER[0]);
        console.log('Login successful:', message);
        window.location.reload(); },
      'error'  : (error) => {
        console.error('Login error:', error); },
      'finally': () => {
        console.log('Login request completed'); }});
  }, [loginData, apiSessionLogin]), 1000);

  /*================================== JSX ===================================*/
  return ( 

    /*------------------------------ Container -------------------------------*/
    <Grid2 
    container 
    sx={{
      alignItems: 'center',
      flex      : '1' }}>
      <Grid2 
      offset={{
        lg: 4,
        sm: 3 }}
      size={{
        xs: 12, 
        sm: 6, 
        lg: 4 }}>
        
        {/*------------------------------ Card ------------------------------*/}
        <Card 
        elevation={0} 
        sx={{ 
          border: '1px solid rgba(0, 0, 0, 0.12)' }}>
          
          {/*------------------------- Card header --------------------------*/}
          <CardHeader 
          title="Sign in" />

          {/*--------------------------- Divider ----------------------------*/}
          <Divider />

          {/*------------------------- Card content -------------------------*/}
          <CardContent
          sx={{
            backgroundColor: 'white',
            padding        : '20px' }}>

            {/*------------------------- Header -------------------------*/}
            <Stack 
            sx={{
              gap         : 2,
              marginBottom: 1,
            }}>

              {/*--------------------------- Logo ---------------------------*/}
              <Stack 
              sx={{
                alignItems: 'center' }}>
                <Box
                component="img"
                src={logo}
                sx={{
                  margin     : 0,
                  marginRight: 1,
                  maxWidth   : '50%',
                  objectFit  : 'cover', }} />
              </Stack>

              {/*--------------------------- Copy ---------------------------*/}
              <Typography 
              variant="h4"
              textAlign={'center'}>
                Authenticate your account
              </Typography>

              <Typography 
              textAlign={'center'}>
                We protect your account as a priority. Enter your email to continue.
              </Typography>
            </Stack>

            <Stack 
            sx={{
              gap         : 1,
              marginBottom: 1,
            }}>

              {/*------------------- Email -------------------*/}
              <CpTextFieldLoader 
              onBlur={handlersEmail.onBlur} 
              onChange={handlersEmail.onChange} 
              onKeyDown={handlersEmail.onKeyDown} 
              value={loginData.email} 
              apiState={apiState} 
              tickets={['Session.login']} 
              onlyDisable={true} 
              placeholder="Enter your email" 
              name="email" 
              size="small" 
              variant="outlined" 
              fullWidth 
              sx={{
                flex        : 1,
                marginBottom: 1 }}/>

              {/*------------------- Password -------------------*/}
              <CpTextFieldLoader 
              onBlur={handlersPassword.onBlur} 
              onChange={handlersPassword.onChange} 
              onKeyDown={handlersPassword.onKeyDown} 
              value={loginData.password} 
              apiState={apiState} 
              tickets={['Session.login']} 
              onlyDisable={true} 
              placeholder="Enter your password" 
              name="password"  
              size="small" 
              variant="outlined" 
              type="password"
              fullWidth 
              sx={{
                flex        : 1,
                marginBottom: 1 }}/>

              {/*---------------- Sign in ----------------*/}
              <CpButtonLoader 
              onClick={handleLoginClick} 
              tickets={['Session.login']} 
              apiState={apiState} 
              variant="contained" 
              size="small" 
              fullWidth 
              sx={{
                backgroundColor: 'grey.200' }}>
                Sign in
              </CpButtonLoader>
            </Stack>
          </CardContent>
        </Card>
      </Grid2>
    </Grid2>
  );
};