/*==============================================================================
----------------------------------- Imports ------------------------------------
==============================================================================*/

/*---------------------------------- React -----------------------------------*/
// React modules.
import React from 'react';

/*----------------------------------- MUI ------------------------------------*/
// MUI components.
import { List } from '@mui/material';  

/*==============================================================================
---------------------------------- Component -----------------------------------
==============================================================================*/
/**
 * Component to create a list of cards.
 *
 * @param {Array<React.ReactNode>} items - List of card items
 * @param {Object} sx - Additional styles
 * @returns {React.ReactNode}
 */
function CpCardList({ children, sx = {} }) {
  return (
    <List 
    sx={{
      paddingBottom: 0,
      paddingTop   : 0,
      ...sx 
    }}>
      {children}
    </List>
  );
}

export default CpCardList;