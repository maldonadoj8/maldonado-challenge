/*==============================================================================
----------------------------------- Imports ------------------------------------
==============================================================================*/

/*---------------------------------- React -----------------------------------*/
// React modules.
import React from 'react';

/*----------------------------------- MUI ------------------------------------*/
// MUI components.
import { Divider, ListItem, Stack } from '@mui/material';  

/*==============================================================================
---------------------------------- Component -----------------------------------
==============================================================================*/
/**
 * Component to create standardized rows in cards.
 *
 * @param {React.ReactNode} children - Row content
 * @param {boolean} divider - Whether to show a divider after the row
 * @param {Object} direction - Row direction (responsive)
 * @param {Object} spacing - Spacing between elements (responsive)
 * @param {Object} sx - Additional styles
 *
 * @returns {React.ReactNode}
 */
function CpCardRow({ children, divider = true, direction = "row", 
spacing = 2, sx = {} }) {
  return (
    <>
      <ListItem>
        <Stack 
        direction={direction}
        spacing={spacing} 
        sx={{ 
          flex: 1, 
          ...sx }}>
          {children}
        </Stack>
      </ListItem>
      {
        divider && 
          <Divider sx={{ marginTop: '4px' }}/>
      }
    </>
  );
}

export default CpCardRow;