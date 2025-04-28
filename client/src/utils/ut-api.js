/*==============================================================================
----------------------------------- Types --------------------------------------
==============================================================================*/

/**
 * @typedef {Object} ApiConfig
 * @property {string} func - Reference to the API function to call.
 * @property {Function} handler - Callback to manage state changes.
 * @property {(string|Function)} [ticket] - Ticket to identify the state. Can be 
 * a string or a function that receives 'params' and returns the ticket.
 */

/**
 * Function that takes a config object and an object with success and error 
 * callbacks.
 *
 * @callback FunctionParamsCases
 * @param {Object} params - Parameters for the API call.
 * @param {CallbacksCases} cases - Callbacks for the API call.
 * @returns {void}
 */

/**
 * Object with standard callbacks for API calls through the SDK.
 *
 * @typedef {Object} CallbacksCases
 * @property {CallbackSuccess} success - Callback executed on success.
 * @property {CallbackError} error - Callback executed on error.
 * @property {CallbackError} finally - Callback always executed at the end.
 */

/**
 * Standard callback for the success case in an API call.
 *
 * @callback CallbackSuccess
 * @param {Object} response - The response object received.
 * @param {Object} changes - The changes processed by the SDK.
 * @returns {void}
 */

/**
 * Standard callback for the error case in an API call.
 *
 * @callback CallbackError
 * @param {Object} response - The response object received.
 * @returns {void}
 */

/*==============================================================================
---------------------------------- Functions -----------------------------------
==============================================================================*/

/*-------------------------------- Utilities --------------------------------*/
/**
 * Creates a stateful API caller.
 * This function generates another function that:
 *   - Updates an internal state (callState) using the provided handler.
 *   - Executes the API call.
 *   - Updates the state based on the result (success or error) and resets it to 
 * neutral after a delay.
 *
 * @function createApiWithState
 * @param {Object} config - Configuration object for the API caller. Extends 
 * {@link ApiConfig} with:
 * @param {number} [config.delay=0] - Delay (in ms) before calling the API (not 
 * used).
 * @param {number} [config.delay_reset=1000] - Delay (in ms) to reset the state 
 * to neutral.
 *
 * @returns {FunctionParamsCases} Returns a function that executes the API call 
 * with state management.
 */
const createApiWithState = ({ delay = 500, delay_reset = 1000, func, handler, 
ticket }) => {
  let callState = {};
  /**
   * Updates the internal state and notifies via the handler.
   *
   * @param {Object} newState - Object with the state update.
   *
   * @return {void}
   */
  const updateCallState = (newState) => {
    callState = { ...callState, ...newState };
    if(typeof handler === "function") {
      handler({ ...callState }); }};
  // Returns the function that will execute the API call with state management.
  return (params, { success, error, finally: finallyCb } = {}) => {
    // If 'ticket' is a function, pass params to get the ticket,
    // otherwise, use the provided value or assign a default.
    const TICKET =
      (typeof ticket === "function" ? ticket(params) : ticket) || `${func}`;
    // Set the temporary state to processing.
    updateCallState({
      [TICKET]: {
        'processing': true,
        'success'   : false,
        'error'     : false } });
    setTimeout(() => {
      // Execute the API call immediately.
      const PARAMS = params;
      const CASES = {
        'success': (response, changes) => {
          const CALL_SUCCESS = response.category !== "ERROR";
          // Set the state as success or error.
          updateCallState({
            [TICKET]: {
              'processing': false,
              'success'   : CALL_SUCCESS,
              'error'     : !CALL_SUCCESS }});
          // Reset the state to neutral after a delay.
          setTimeout(
            () => {
              if(typeof success === "function") {
                success(response, changes); }
              updateCallState({
                [TICKET]: {
                  'processing': false,
                  'success'   : false,
                  'error'     : false }});
              if(typeof finallyCb === "function") {
                finallyCb(response); }},
            delay_reset); },
        'error': (response) => {
          // Set the state as error.
          updateCallState({
            [TICKET]: {
              'processing': false,
              'success'   : false,
              'error'     : true } });
          // Reset the state to neutral after a delay.
          setTimeout(
            () => {
              if(typeof error === "function") {
                error(response); }
              updateCallState({
                [TICKET]: {
                  'processing': false,
                  'success'   : false,
                  'error'     : false }});
              if(typeof finallyCb === "function") {
                finallyCb(response); }},
            delay_reset); }};
      // Call the function with params if not null.
      PARAMS
        ? func(PARAMS, CASES)
        : func(CASES);
    }, delay);
  }; };

export { createApiWithState };
