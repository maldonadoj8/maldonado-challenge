/*==============================================================================
----------------------------------- Imports ------------------------------------
==============================================================================*/

/*---------------------------------- React -----------------------------------*/
// React modules.
import React, { 
  useMemo,
  useState } from 'react';

/*---------------------------------- Hooks -----------------------------------*/
// Hook for formatting inputs.
import { useCaptureFields } from '../../../../core/hooks/hk-data-capture.jsx';

/*-------------------------------- Components --------------------------------*/
// Component CpCardBase.
import CpCardBase from '../../../../common/components/cp-card-base.jsx';

// Component CpCardList.
import CpCardList from '../../../../common/components/cp-card-list.jsx';

// Component CpCardRow.
import CpCardRow from '../../../../common/components/cp-card-row.jsx';

// Component CpCardEditableField.
import CpCardEditableField 
from '../../../../common/components/cp-card-editable-field.jsx';

// Component CpTextFieldLoader.
import CpTextFieldLoader 
from '../../../../common/components/cp-textfield-loader.jsx';

/*==============================================================================
---------------------------------- Component -----------------------------------
==============================================================================*/
/**
 * Editable user profile card.
 *
 * @param {Object} props
 * @param {Object} props.user - User object to edit
 * 
 * @returns {React.ReactNode}
 */
function CpCardEditUser({ user }) {

  /*-------------------------------- useState --------------------------------*/
  // State for user form data.
  const [userData, setUserData] = useState({
    'email'     : user.email || '',
    'name.first': user.name.first || '',
    'name.last' : user.name.last || '',
    'company'   : user.company || '',
    'phone'     : user.phone || '',
    'address'   : user.address || ''
  });

  /*----------------------------- HkCaptureFields -----------------------------*/
  // Hook for formatting inputs.
  const {
    apiState,
    generateHandlers,
  } = useCaptureFields({
    'initialValues'   : userData,
    'setExternalState': setUserData,
    'conditionalState': user,
    'editRecord'      : user,
    'editApi'         : {
      'func'   : window.User.editProfile,
      'ticket' : (params) => `User.editProfile.${params.field}` }
  });

  /*-------------------------------- Handlers --------------------------------*/
  // Handlers for name text field events.
  const handlersTextfieldFirstName = useMemo(() => generateHandlers('name'), [generateHandlers]);
  
  // Handlers for name text field events.
  const handlersTextfieldLastName = useMemo(() => generateHandlers('name'), [generateHandlers]);

  // Handlers for email text field events.
  const handlersEmail = useMemo(() => generateHandlers('email'), [generateHandlers]);
  
  // Handlers for address text field events.
  const handlersTextfieldAddress = useMemo(() => generateHandlers('description'), [generateHandlers]);

  // Handlers for company text field events.
  const handlersTextfieldCompany = useMemo(() => generateHandlers('name'), [generateHandlers]);
  
  // Handlers for phone text field events.
  const handlersTextfieldPhone = useMemo(() => generateHandlers('phone'), [generateHandlers]);

  /*================================== JSX ===================================*/
  if(!user) {
    return null; }

  return (
    
    /*------------------------------ CpCardBase ------------------------------*/
    <CpCardBase 
    title="Edit User Profile">

      {/*---------------------------- CpCardList ----------------------------*/}
      <CpCardList>

        {/*---------------------------- 1st row -----------------------------*/}
        <CpCardRow>

          {/*-------------------------- First name --------------------------*/}
          <CpCardEditableField 
          label="First Name">

            {/*--------------------- CpTextFieldLoader ----------------------*/}
            <CpTextFieldLoader 
            onChange={handlersTextfieldFirstName.onChange}
            value={userData['name.first']} 
            apiState={apiState} 
            tickets={['User.editProfile.name.first']} 
            name="name.first"
            size="small"
            variant="outlined"
            fullWidth />
          </CpCardEditableField>

          {/*-------------------------- Last name ---------------------------*/}
          <CpCardEditableField 
          label="Last Name">

            {/*--------------------- CpTextFieldLoader ----------------------*/}
            <CpTextFieldLoader
            onChange={handlersTextfieldLastName.onChange}
            value={userData['name.last']}
            apiState={apiState}
            tickets={['User.editProfile.name.last']}
            name="name.last"
            size="small"
            variant="outlined"
            fullWidth />
          </CpCardEditableField>
        </CpCardRow>

        {/*---------------------------- 2nd row -----------------------------*/}
        <CpCardRow>

          {/*---------------------------- Email -----------------------------*/}
          <CpCardEditableField 
          label="Email">

            {/*--------------------- CpTextFieldLoader ----------------------*/}
            <CpTextFieldLoader
            onChange={handlersEmail.onChange}
            value={userData.email}
            apiState={apiState}
            tickets={['User.editProfile.email']}
            name="email"
            size="small"
            variant="outlined"
            fullWidth
            type="email" />
          </CpCardEditableField>

          {/*--------------------------- Company ----------------------------*/}
          <CpCardEditableField 
          label="Company">

            {/*--------------------- CpTextFieldLoader ----------------------*/}
            <CpTextFieldLoader
            onChange={handlersTextfieldCompany.onChange}
            value={userData.company}
            apiState={apiState}
            tickets={['User.editProfile.company']}
            name="company"
            size="small"
            variant="outlined"
            fullWidth />
          </CpCardEditableField>
        </CpCardRow>

        {/*---------------------------- 3rd row -----------------------------*/}
        <CpCardRow 
        divider={false}>

          {/*---------------------------- Phone -----------------------------*/}
          <CpCardEditableField 
          label="Phone">

            {/*--------------------- CpTextFieldLoader ----------------------*/}              
            <CpTextFieldLoader
            onChange={handlersTextfieldPhone.onChange}
            value={userData.phone}
            apiState={apiState}
            tickets={['User.editProfile.phone']}
            name="phone"
            size="small"
            variant="outlined"
            fullWidth />
          </CpCardEditableField>

          {/*---------------------------- Adress ----------------------------*/}
          <CpCardEditableField label="Address">

            {/*--------------------- CpTextFieldLoader ----------------------*/}
            <CpTextFieldLoader
            onChange={handlersTextfieldAddress.onChange}
            value={userData.address}
            apiState={apiState}
            tickets={['User.editProfile.address']}
            name="address"
            size="small"
            variant="outlined"
            fullWidth />
          </CpCardEditableField>
        </CpCardRow>
      </CpCardList>
    </CpCardBase>
  );
}

export default CpCardEditUser;