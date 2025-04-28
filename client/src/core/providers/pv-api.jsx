/*==============================================================================
------------------------------------ Types -------------------------------------
==============================================================================*/
/**
 * @typedef {Object} ApiState
 * @property {Object} [apiState] - Object containing the state of each API call.
 */

/*==============================================================================
----------------------------------- Imports ------------------------------------
==============================================================================*/
// React modules.
import React, { 
  createContext, 
  useContext, 
  useState, 
  useCallback } from 'react';

/*==============================================================================
---------------------------------- Context -------------------------------------
==============================================================================*/
/**
 * Context to manage the state of API requests.
 *
 * @type {React.Context}
 */
const CxApi = createContext();

/**
 * Custom hook to consume the API context.
 *
 * @function useCxApi
 *
 * @returns {Object} Object with the state and functions to update the API 
 * state.
 */
export function useCxApi() {
  return useContext(CxApi); }

/*==============================================================================
---------------------------------- Provider ------------------------------------
==============================================================================*/
/**
 * Provider component for the API context.
 *
 * This component manages the global state of API requests and provides a 
 * callback to update that state.
 *
 * @component PvApi
 * @param {...React.ReactNode} children - Child components that will have access 
 * to the API context.
 *
 * @returns {React.ReactNode} Component that wraps its children with the API 
 * context.
 */
function PvApi({ children }) {
  
  /*-------------------------------- useState --------------------------------*/
  // State to manage the state of API requests.
  const [apiState, setApiState] = useState({});

  /*------------------------------ useCallback -------------------------------*/
  /**
   * Callback to update the state of API requests.
   * Merges the previous state with the new properties specified in `newState`.
   *
   * @param {Object} newState - Object with the properties to update in the 
   * state.
   * 
   * @returns {void}
   */
  const apiStateHandler = useCallback((newState) => {
    setApiState((prev) => ({
      ...prev,
      ...newState }));
  }, []);

  /*================================== JSX ===================================*/
  return (
    <CxApi.Provider 
    value={{ 
      apiState, 
      apiStateHandler, 
      setApiState 
    }}>
      {children}
    </CxApi.Provider>
  );
}

export default PvApi;