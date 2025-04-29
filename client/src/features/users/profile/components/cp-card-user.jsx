/*==============================================================================
----------------------------------- Imports ------------------------------------
==============================================================================*/

/*---------------------------------- React -----------------------------------*/
// React modules.
import React from 'react';

/*-------------------------------- Components --------------------------------*/
// Component CpCardBase.
import CpCardBase from '../../../../common/components/cp-card-base.jsx';

// Component CpCardList.
import CpCardList from '../../../../common/components/cp-card-list.jsx';

// Component CpCardRow.
import CpCardRow from '../../../../common/components/cp-card-row.jsx';

// Component CpCardField.
import CpCardField from '../../../../common/components/cp-card-field.jsx';

/*---------------------------------- Files -----------------------------------*/
// Placeholder image.
import placeholder11 from '../../../../assets/placeholder-1-1.jpg';

/*----------------------------------- MUI ------------------------------------*/
// MUI components.
import { Box } from '@mui/material';

/*==============================================================================
---------------------------------- Component -----------------------------------
==============================================================================*/
/**
 * User profile card (read-only).
 *
 * @param {Object} props
 * @param {Object} props.user - User object to display
 * 
 * @returns {React.ReactNode}
 */
function CpCardUser({ user }) {
  if(!user) { 
    return null; }

  /*================================== JSX ===================================*/
  return (

    /*------------------------------ CpCardBase ------------------------------*/
    <CpCardBase 
    title={

      /*------------------------------- Avatar -------------------------------*/
      <Box
      component="img"
      src={placeholder11} 
      sx={{
        aspectRatio: '1/1',
        margin     : 0,
        marginRight: 1,
        maxWidth   : { xs: '50%', sm: '20%' },
        objectFit  : 'cover',                  }} />
    }
    action={user.balance}>

      {/*---------------------------- CpCardList ----------------------------*/}
      <CpCardList>

        {/*---------------------------- 1st row -----------------------------*/}
        <CpCardRow 
        direction={{ xs: 'column', sm: 'row' }}>

          {/*----------------------------- Name -----------------------------*/}
          <CpCardField 
          label="Name" 
          value={`${user.name.first} ${user.name.last}`} />

          {/*---------------------------- Email -----------------------------*/}
          <CpCardField 
          label="Email" 
          value={user.email} />
        </CpCardRow >
    
        {/*---------------------------- 2nd row -----------------------------*/}
        <CpCardRow
        direction={{ xs: 'column', sm: 'row' }}>

          {/*--------------------------- Company ----------------------------*/}
          <CpCardField 
          label="Company" 
          value={user.company} />

          {/*---------------------------- Phone -----------------------------*/}
          <CpCardField 
          label="Phone" 
          value={user.phone} />
        </CpCardRow>

        {/*---------------------------- 3rd row -----------------------------*/}
        <CpCardRow
        direction={{ xs: 'column', sm: 'row' }}>

          {/*--------------------------- Address ----------------------------*/}
          <CpCardField 
          label="Address" 
          value={user.address} />
        </CpCardRow>

        {/*---------------------------- 4th row -----------------------------*/}
        <CpCardRow
        direction={{ xs: 'column', sm: 'row' }} 
        divider={false}>

          {/*----------------------------- Age ------------------------------*/}
          <CpCardField 
          label="Age" 
          value={user.age} />

          {/*-------------------------- Eye color ---------------------------*/}
          <CpCardField 
          label="Eye color" 
          value={user.eyeColor} />
        </CpCardRow>
      </CpCardList>
    </CpCardBase>
  );
}

export default CpCardUser;