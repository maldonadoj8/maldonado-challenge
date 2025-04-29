/*==============================================================================
----------------------------------- Imports ------------------------------------
==============================================================================*/

/*---------------------------------- React -----------------------------------*/
// React modules.
import React from 'react';

/*----------------------------------- MUI ------------------------------------*/
// MUI components.
import { Stack, Typography } from '@mui/material';  

/*==============================================================================
---------------------------------- Component -----------------------------------
==============================================================================*/
/**
 * Component for an editable card field.
 *
 * @param {string} label - Field label
 * @param {React.ReactNode} children - Field content
 * @param {number} flex - Flex value for the field
 * @param {string} direction - Layout direction
 * @param {string} helperText - Helper text for the field
 * @param {Object} sx - Additional styles
 * @returns {React.ReactNode}
 */
function CpCardEditableField({ label, children, flex = 1, direction = "column",
helperText, sx = {} }) {
  return (
    <Stack 
    direction={direction}
    spacing={1} 
    sx={{ 
      flex, 
      ...sx }}>
      <Typography
      variant="body1"
      sx={{
        color: 'rgb(140, 140, 140)' }}>
        {label}
      </Typography>
      
      {children}
      
      {
        helperText && (
          <Typography 
          variant="caption" 
          color="text.secondary">
            {helperText}
          </Typography>
        )
      }
    </Stack>
  );
}

export default CpCardEditableField;