/*==============================================================================
----------------------------------- Imports ------------------------------------
==============================================================================*/

/*================================== React ===================================*/
// React modules.
import React from 'react';

// React Router Dom modules.
import { createBrowserRouter, Navigate } from 'react-router-dom';

/*================================= Layouts ==================================*/
// Layout LyHome.
import LyHome from '../layouts/ly-home.jsx';

// Layout LyAuth.
import LyAuth from '../layouts/ly-auth.jsx';

/*==============================================================================
------------------------------------ Views -------------------------------------
==============================================================================*/

/*================================== Users ===================================*/
/*----------------------------------- Auth -----------------------------------*/
// View VwLogin.
import VwLogin from '../features/users/auth/views/vw-login.jsx';

/*--------------------------------- Profile ----------------------------------*/
// View VwProfile.
import VwProfile from '../features/users/profile/views/vw-profile.jsx';

/*==============================================================================
---------------------------------- Component -----------------------------------
==============================================================================*/
function RtGlobal() { 
  return createBrowserRouter([
    
  /*=================== Main route for authenticated users ===================*/
  {
    path    : "/",
    element : <LyHome />,
    children: [
    
      /*=============================== Users ================================*/
      /*------------------------------ Profile -------------------------------*/
      {
        path   : "",
        element: <VwProfile />, 
        index  : true
      }
    ]
  },
  
  /*============= Authentication route for unauthenticated users =============*/
  {
    path    : "auth",
    element : <LyAuth />,
    children: [

      /*=============================== Users ================================*/
      /*-------------------------------- Auth --------------------------------*/
      {
        path   : "",
        element: <VwLogin />,
        index  : true
      },
    ],
  },
  
  /*============================= Wildcard route =============================*/
  {
    path   : "*",
    element: <Navigate to="/" replace/>
  }], 
  {
    future: {
      v7_startTransition  : true,
      v7_relativeSplatPath: true }});
};

export default RtGlobal;