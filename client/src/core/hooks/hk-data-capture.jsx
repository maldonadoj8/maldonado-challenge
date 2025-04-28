/*==============================================================================
----------------------------------- Imports ------------------------------------
==============================================================================*/

/*---------------------------------- React -----------------------------------*/
// React modules.
import { useCallback, useState } from 'react';

/*-------------------------------- Utilities --------------------------------*/
// Text utilities.
import * as utText from '../../utils/ut-text.js';

/*==============================================================================
-------------------------------- Configurations --------------------------------
==============================================================================*/
/**
 * Formatting configurations for different field types.
 *
 * @typedef {Object} FieldConfig
 * @property {Function} [keyPattern] - Function for allowed key pattern.
 * @property {Function} [onChangeFormat] - Function for real-time formatting.
 * @property {Function} [onBlurFormat] - Function for formatting on blur.
 * @property {Function} [sanitize] - Function to sanitize the value.
 * @property {Function} [parse] - Function to parse the value before saving.
 */
const FIELD_CONFIGURATIONS = {
  'email': {
    'keyPattern'    : utText.isEmail,
    'onChangeFormat': (value) => utText.formatEmail(value),
    'sanitize'      : (value) => utText.sanitizeEmail(value),
    'maxLength'     : 20
  },
  'password': { },
  'code': {
    'keyPattern'    : utText.isAlphanumeric,
    'onChangeFormat': (value) => utText.format2FACode(value, 20),
    'sanitize'      : (value) => utText.sanitizeAlphanumeric(value),
    'maxLength'     : 20
  },
  'money': {
    'keyPattern'    : utText.isNumberOrDot,
    'onChangeFormat': (value) => utText.formatMoney(value),
    'onBlurFormat'  : (value) => utText.formatMoneyPost(value),
    'sanitize'      : (value) => utText.sanitizeDecimalNumber(value),
    'parse'         : (value) => parseFloat(value),
    'maxLength'     : 10
  },
  'id': {
    'keyPattern'    : utText.isNumber,
    'sanitize'      : (value) => utText.sanitizeNumber(value),
    'maxLength'     : 2,
    'parse'         : (value) => parseInt(value),
  },
  'name': {
    'keyPattern'    : utText.isBasicDescriptionChar,
    'onChangeFormat': (value) => utText.formatBasicDescription(value),
    'sanitize'      : (value) => utText.sanitizeDescription(value),
    'maxLength'     : 100
  },
  'decimal_number': {
    'keyPattern'    : utText.isNumberOrDot,
    'onChangeFormat': (value) => utText.formatDecimalNumber(value),
    'onBlurFormat'  : (value) => utText.formatDecimalNumberPost(value),
    'sanitize'      : (value) => utText.sanitizeDecimalNumber(value)
  },
  'card': {
    'keyPattern'    : utText.isNumber,
    'onChangeFormat': (value) => utText.formatCardNumber(value),
    'sanitize'      : (value) => utText.sanitizeNumber(value),
    'maxLength'     : 16
  },
  'phone': {
    'keyPattern'    : utText.isNumber,
    'onChangeFormat': (value) => utText.formatPhoneNumber(value),
    'sanitize'      : (value) => utText.sanitizeNumber(value),
    'maxLength'     : 10
  },
  'basic_description': {
    'keyPattern'    : utText.isBasicDescriptionChar,
    'onChangeFormat': (value) => utText.formatBasicDescription(value),
    'sanitize'      : (value) => utText.sanitizeDescription(value),
    'maxLength'     : 100
  },
  'description': {
    'keyPattern'    : utText.isDescriptionChar,
    'onChangeFormat': (value) => utText.formatDescription(value),
    'sanitize'      : (value) => utText.sanitizeDescription(value),
    'maxLength'     : 100
  }
};

/*==============================================================================
---------------------------------- Hook ----------------------------------------
==============================================================================*/
/**
 * Custom hook to manage form fields with special formatting.
 *
 * This hook facilitates handling input fields that require real-time 
 * formatting, key validation, and sanitization for API submission. It provides 
 * consistent handlers for onChange, onKeyDown, and onBlur events.
 *
 * @function useCaptureFields
 *
 * @param {Object} props - Hook properties.
 * @param {Object} props.fieldsConfig - Configuration for the fields to handle.
 * @param {Object} [props.initialValues={}] - Initial values for the fields.
 * @param {Function} [props.setExternalState=null] - Function to update external 
 * state (optional).
 *
 * @returns {Object} An object with the following properties:
 * @returns {Object} return.values - Current state of all managed fields.
 * @returns {Function} return.setValues - Function to update all values.
 * @returns {Function} return.generateHandlers - Function to get handlers for a 
 * specific field.
 */
export function useCaptureFields({ 
  fieldsConfig = {}, 
  initialValues = {}, 
  setExternalState = null }) {
  
  /*-------------------------------- useState --------------------------------*/
  // Field values.
  const [values, setValues] = useState(initialValues);

  /*-------------------------------- Methods ---------------------------------*/
  /**
   * Gets event handlers for a specific field.
   *
   * @function generateHandlers
   * @param {string} fieldName - Name of the field to get handlers for.
   *
   * @returns {Object} Object with onChange, onKeyDown, and onBlur handlers.
   */
  const generateHandlers = useCallback((fieldName) => {
    const CONFIG = fieldsConfig[fieldName] 
                    || FIELD_CONFIGURATIONS[fieldName] 
                    || {};
    return {
      /*------------------------------ onChange ------------------------------*/
      onChange: (e) => {
        const { name, value } = e.target;
        let newValue = value;
        if(CONFIG.onChangeFormat) {
          newValue = CONFIG.onChangeFormat(value, CONFIG.maxLength); }
        // Update internal state.
        setValues(prev => ({
          ...prev,
          [name]: newValue }));
        // Update external state if provided.
        if(setExternalState) {
          setExternalState(prev => ({
            ...prev,
            [name]: newValue })); }
      },
      
      /*----------------------------- onKeyDown -----------------------------*/
      onKeyDown: (e) => {
        // Allow special keys.
        if(utText.isAllowedKeyCode(e.key)) {
          return; }
        // Check key pattern.
        if(CONFIG.keyPattern && !CONFIG.keyPattern(e.key)) {
          e.preventDefault(); }
      },
      
      /*------------------------------- onBlur -------------------------------*/
      onBlur: (e) => {
        const { name, value } = e.target;
        let newValue = value;
        if(CONFIG.onBlurFormat) {
          newValue = CONFIG.onBlurFormat(value, CONFIG.maxLength); }
        // Update internal state.
        setValues(prev => ({
          ...prev,
          [name]: newValue }));
        // Update external state if provided.
        if(setExternalState) {
          setExternalState(prev => ({
            ...prev,
            [name]: newValue })); }
      }};
  }, [fieldsConfig, setExternalState]);

  /*================================= Return =================================*/
  return {
    values,
    setValues,
    generateHandlers,
  };
}