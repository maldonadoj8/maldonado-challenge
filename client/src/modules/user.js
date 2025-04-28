/*==============================================================================
----------------------------------- Imports ------------------------------------
==============================================================================*/

/*---------------------------------- Server ----------------------------------*/
import { api, createHandler } from './server.js';

/*--------------------------------- Database ---------------------------------*/
import { handlerWrapper } from './database.js';

/*==============================================================================
----------------------------------- Exports ------------------------------------
==============================================================================*/
export { editProfile };

/*==============================================================================
------------------------------------- APIs -------------------------------------
==============================================================================*/
/**
 * Sends a request to update a specific user profile field with the provided 
 * value.
 *
 * @param {Object} [params={}] - Profile update parameters.
 * @param {string} params.field - The specific user profile field to update.
 * @param {*} params.value - The new value to assign to the field.
 * @param {Object} [handlers={}] - Optional handlers for API response (success, 
 * error, finally).
 * @returns {void}
 */
function editProfile(params = {}, handlers = {}) {
  api({ 
    'api' : 'edit_profile',
    'data': { 
      'field': params.field, 
      'value': params.value }, 
    'handler': createHandler(handlerWrapper(handlers)) }); };