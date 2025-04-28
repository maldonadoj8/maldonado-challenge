/*==============================================================================
--------------------------------- Imports ------------------------------------
==============================================================================*/
// React modules.
import React from 'react';

// React DOM modules.
import ReactDOM from 'react-dom/client';

// React Router Dom modules.
import { RouterProvider } from 'react-router-dom';

/*================================= Routing ==================================*/
// RtGlobal router.
import RtGlobal from './routing/rt-global.jsx';

/*================================ Providers =================================*/
// PvApi provider.
import PvApi from './core/providers/pv-api.jsx';

// PvApp provider.
import PvApp from './core/providers/pv-app.jsx';

/*=================================== MUI ====================================*/
// ThemeProvider.
import { ThemeProvider } from '@mui/material/styles';

// MUI components.
import { CssBaseline } from '@mui/material';

/*================================ Constants =================================*/
// Custom theme.
import { THEME } from './config/cf-theme.jsx';

/*==============================================================================
--------------------------------- Entry point ----------------------------------
==============================================================================*/
ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={THEME}>
    
    {/*---------------------------- CssBaseline -----------------------------*/}
    <CssBaseline />

    {/*-------------------------------- App ---------------------------------*/}
    <PvApi>
      <PvApp>
        <RouterProvider 
        router={RtGlobal()} />
      </PvApp>
    </PvApi>

    {/*------------------------------ Snackbar ------------------------------*/}
    {/* <CpSnackBar /> */}
  </ThemeProvider>
);