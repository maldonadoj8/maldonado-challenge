/*==============================================================================
----------------------------------- Imports ------------------------------------
==============================================================================*/

/*----------------------------------- MUI ------------------------------------*/
import { createTheme } from '@mui/material/styles';

/*==============================================================================
------------------------------------ Theme -------------------------------------
==============================================================================*/
export const THEME = createTheme({

  /*------------------------------- Components -------------------------------*/
  components: {

    /*------------------------------ Textfield -------------------------------*/
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor        : '#FAFAFA',
          borderColor            : '#F5F5F5',
          '& .MuiInputBase-input': {
            fontSize: '16px !important',
            '@media (min-width:600px)': {
              fontSize: '14px !important' }}}}},

    /*-------------------------------- Alert ---------------------------------*/
    MuiAlert: {
      styleOverrides: {
        root: {
          // fontFamily: "'Inter Tight', sans-serif",
          fontSize  : "1rem",
          fontWeight: 600,
          lineHeight: '120%' }}},

    /*-------------------------------- Button --------------------------------*/
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none' }}},

    /*------------------------------- Checkbox -------------------------------*/
    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: '0px' }}},

    /*---------------------------- Step Connector ----------------------------*/
    MuiStepConnector: {
      styleOverrides: {
        root: {
          "& .MuiStepConnector-line": { }}}},

    /*------------------------------- Divider --------------------------------*/
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: '#F0EFEE',
          margin     : '0px',
          flexShrink : '0',
          borderWidth: '0px 0px 1px',
          borderStyle: 'solid' 
        }}},

    /*----------------------------- Dialog Title -----------------------------*/
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize  : '1.563rem',
          fontWeight: 600,
          lineHeight: '160%' 
        }}},

    /*--------------------------- Linear progress ----------------------------*/
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: '4px' }}},

    /*------------------------------ Table Cell ------------------------------*/
    MuiTableCell:{
      styleOverrides: {
        root: {
          fontSize  : '0.889rem',
          fontWeight: 400,
          lineHeight: '160%' },
        head: {
          backgroundColor  : '#F5F5F5',
          // fontFamily       : "'Inter', sans-serif",
          fontSize         : '0.889rem',
          fontWeight       : 600,
          lineHeight       : '120%',
          '&:last-of-type' : { paddingRight: '24px' },
          '&:first-of-type': { paddingLeft: '24px' }}}}, 

    /*------------------------------- Toolbar --------------------------------*/
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: '60px !important' }}}, 

    /*----------------------------- Card Content -----------------------------*/
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding       : '16px',
          "&:last-child": { paddingBottom: '24px' }}}},

    /*------------------------------ List Item -------------------------------*/
    MuiListItem: {
      styleOverrides: {
        root: {
          paddingInline : '8px' }}},

    /*----------------------------- Card Header ------------------------------*/
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: '16px' },
        title: {
          // fontFamily: "'Inter Tight', sans-serif",
          fontSize  : "1rem",
          fontWeight: 500,
          lineHeight: '120%' }, 
        action: {
          alignSelf   : 'end',
          marginBottom: '0px',
          marginTop   : '0px' }}}},

  /*--------------------------------- Colors ---------------------------------*/
  palette: {
    
    /*--------------------------------- Text ---------------------------------*/
    text: {
      primary  : '#191918',
      secondary: '#595755',
      disabled : '#A39F9C'
    },

    /*------------------------------- Primary --------------------------------*/
    primary: {
      main        : '#2A94F2',
      light       : '#FFEBDB',
      contrastText: '#1E1919'
    },

    /*------------------------------ Secondary -------------------------------*/
    secondary: {
      main        : '#00559E',
      contrastText: '#FFFFFF'
    },

    /*------------------------------ Semantics -------------------------------*/
    error: {
      main        : '#DC2E00',
      contrastText: '#FFFFFF'
    },
    warning: {
      main        : '#2A94F2',
      contrastText: '#191918'
    },
    info: {
      main        : '#0078DA',
      contrastText: '#FFFFFF'
    },
    success: {
      main        : '#008017',
      contrastText: '#FFFFFF'
    },

    /*------------------------------ Background ------------------------------*/
    background: {
      default: '#FFFFFF',
      paper  : '#FEFEFE'
    },

    /*-------------------------------- Action --------------------------------*/
    action: {
      selected: '#FFEBDB'
    }, 

    /*--------------------------------- Grey ---------------------------------*/
    grey: {
      50  : '#FAFAFA',
      100 : '#F5F5F5',
      200 : '#EEEEEE',
      300 : '#F0EFEE',
      400 : '#CAC6C2',
      500 : '#A39F9C',
      600 : '#7D7A78',
      700 : '#595755',
      800 : '#383735',
      900 : '#191918' 
    }},

  /*------------------------------ Breakpoints -------------------------------*/
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536 
    }},

  /*------------------------------- Typography -------------------------------*/
  typography: {
    /*------------------------------- General --------------------------------*/
    // fontFamily  : "'Inter', sans-serif",
    fontSize    : 14,
    htmlFontSize: 14,

    /*---------------------------------- Hs ----------------------------------*/
    h1: {
      // fontFamily: "'Inter Tight', sans-serif",
      fontSize  : "3.052rem",
      fontWeight: 600,
      lineHeight: '120%'
    },
    h2: {
      // fontFamily: "'Inter Tight', sans-serif",
      fontSize  : "2.441rem",
      fontWeight: 600,
      lineHeight: '120%'
    },
    h3: {
      // fontFamily: "'Inter Tight', sans-serif",
      fontSize  : "1.953rem",
      fontWeight: 600,
      lineHeight: '120%'
    },
    h4: {
      // fontFamily: "'Inter Tight', sans-serif",
      fontSize  : "1.563rem",
      fontWeight: 600,
      lineHeight: '120%'
    },
    h5: {
      // fontFamily: "'Inter Tight', sans-serif",
      fontSize  : "1.25rem",
      fontWeight: 600,
      lineHeight: '120%'
    },
    h6: {
      // fontFamily: "'Inter Tight', sans-serif",
      fontSize  : "1rem",
      fontWeight: 600,
      lineHeight: '120%'
    },

    /*------------------------------- Subtitle -------------------------------*/
    subtitle1: { 
      // fontFamily: "'Inter Tight', sans-serif",
      fontSize  : "1rem",
      fontWeight: 500,
      lineHeight: '120%'
    },
    subtitle2: { 
      // fontFamily: "'Inter Tight', sans-serif",
      fontSize  : "0.889rem",
      fontWeight: 500,
      lineHeight: '120%'
    },
    
    /*--------------------------------- Body ---------------------------------*/
    body1: { 
      // fontFamily: "'Inter', sans-serif",
      fontSize  : "1rem",
      fontWeight: 400,
      lineHeight: '160%'
    },
    body2: { 
      // fontFamily: "'Inter', sans-serif",
      fontSize  : "0.8rem",
      fontWeight: 400,
      lineHeight: '160%'
    },

    /*--------------------------------- Misc ---------------------------------*/
    button: { 
      // fontFamily: "'Inter', sans-serif",
      fontSize  : "1rem",
      fontWeight: 500,
      lineHeight: '160%'
    },
    caption: { 
      // fontFamily: "'Inter', sans-serif",
      fontSize  : "0.8rem",
      fontWeight: 500,
      lineHeight: '160%'
    },
    overline: { 
      // fontFamily: "'Inter', sans-serif",
      fontSize  : "0.64rem",
      fontWeight: 500,
      lineHeight: '160%'
    }}

});