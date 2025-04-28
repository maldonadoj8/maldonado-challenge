/*==============================================================================
------------------------------------- Defs -------------------------------------
==============================================================================*/
/**
 * All tables have the same base fields to help automate certain processes and 
 * standardize data.
 *
 * @typedef {Object} BASE_RECORD
 *
 * @property {string|number} id
 * The unique identifier of the record.
 *
 * @property {string|number} entityId
 * The identifier of the entity to which the record belongs.
 */

/**
 * A user object as defined in the database.
 *
 * @typedef {BASE_RECORD} USER
 * 
 * @property {string}              _id
 * Unique identifier for the user.
 * 
 * @property {string}              guid
 * Globally unique identifier for the user.
 * 
 * @property {boolean}             isActive
 * Indicates if the user account is active.
 * 
 * @property {string}              balance
 * User's account balance as a string (e.g., "$3,585.69").
 * 
 * @property {string}              picture
 * URL to the user's profile picture.
 * 
 * @property {number}              age
 * User's age.
 * 
 * @property {string}              eyeColor
 * User's eye color.
 * 
 * @property {Object}              name
 * User's name object.
 * 
 * @property {string}              name.first
 * User's first name.
 * 
 * @property {string}              name.last
 * User's last name.
 * 
 * @property {string}              company
 * Name of the company the user works for.
 * 
 * @property {string}              email
 * User's email address.
 * 
 * @property {string}              password
 * User's password (should be stored securely in production).
 * 
 * @property {string}              phone
 * User's phone number.
 * 
 * @property {string}              address
 * User's address.
 * 
 * @property {string|number}       id
 * The unique identifier of the record (from BASE_RECORD).
 * 
 * @property {string|number}       entityId
 * The identifier of the entity to which the record belongs (from BASE_RECORD).
 */

/**
 * A session object representing a user session.
 *
 * @typedef {BASE_RECORD} SESION
 * 
 * @property {string} userId
 * The unique identifier of the user associated with this session.
 * 
 * @property {string} token
 * The session token used for authentication.
 * 
 * @property {string|number} id
 * The unique identifier of the record (from BASE_RECORD).
 * 
 * @property {string|number} entityId
 * The identifier of the entity to which the record belongs (from BASE_RECORD).
 */

/** 
 * Content of a value in the ENTITY constant.
 *
 * @typedef {Object} entity_info
 *
 * @property {number} ID 
 * ID of the described entity.
 *
 * @property {string} NAME 
 * Name of the described entity.
 */

/*==============================================================================
---------------------------------- Directory -----------------------------------
==============================================================================*/
/**
 * Contains the ids, names, etc. of entities for the custom system tables.
 *
 * @type {Object.<string, entity_info>}
 */
export const ENTITY = {
  'SESION': { 'ID': 1, 'NAME': 'sesion' },
  'USER':   { 'ID': 2, 'NAME': 'user' }
};