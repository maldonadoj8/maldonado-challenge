/*==============================================================================
----------------------------------- Imports ------------------------------------
==============================================================================*/

/*---------------------------------- React -----------------------------------*/
// React modules.
import React from 'react';

/*----------------------------------- MUI ------------------------------------*/
// MUI components.
import { Link, Stack, Typography } from '@mui/material';  

/*==============================================================================
---------------------------------- Component -----------------------------------
==============================================================================*/
/**
 * Component for standardized fields in card rows.
 * 
 * @param {string} label - Field label
 * @param {React.ReactNode|string} value - Field value
 * @param {Object} linkG - Configuration to display the value as a link
 * @param {number|Object} flex - Flex value for the field
 * @param {Object} sx - Additional styles
 * 
 * @returns {React.ReactNode}
 */
function CpCardField({ label, value, linkG, flex = 1, sx = {} }) {
  return (
    <Stack 
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

      {
        React.isValidElement(value) 
          ? value 
          : (
              <Typography variant="body1">
                {
                  linkG 
                    ? (
                        <Link 
                        href={linkG.href} 
                        target={linkG.target || "_blank"} 
                        color={linkG.color || "info.main"}>
                          {value || linkG.text}
                        </Link>
                      )
                    : value
                }
              </Typography>
            )
      }
    </Stack>
  );
}

export default CpCardField;