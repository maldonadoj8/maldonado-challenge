/*==============================================================================
----------------------------------- Imports ------------------------------------
==============================================================================*/

/*---------------------------------- React -----------------------------------*/
// React modules.
import React from 'react';

/*----------------------------------- MUI ------------------------------------*/
// MUI components.
import { Card, CardContent, CardHeader, Divider } from '@mui/material';  

/*==============================================================================
---------------------------------- Component -----------------------------------
==============================================================================*/
/**
 * Component to create a standardized card base.
 * 
 * @param {React.ReactNode|string} title - Title to display in the top left corner.
 * @param {React.ReactNode} action - Actions to display in the top right corner.
 * @param {React.ReactNode} children - Card content.
 * @param {number} elevation - Card elevation.
 * @param {boolean} divider - Indicates whether to display a divider between the header and the content.
 * @param {Object} sx - Additional styles for the card.
 * 
 * @returns {React.ReactNode}
 */
function CpCardBase({ title, action, children, elevation = 0, divider = true, 
sx = {} }) {
  
  /*================================== JSX ===================================*/
  return (
    <Card 
    elevation={elevation} 
    sx={{ 
      border: '1px solid rgba(0, 0, 0, 0.12)',
      ...sx
    }}>
      {
        title && 
          <CardHeader 
          title={title} 
          action={action} />
      }
      {
        divider && 
          <Divider />
      }
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}

export default CpCardBase;