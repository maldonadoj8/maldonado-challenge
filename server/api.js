/*==============================================================================
----------------------------------- Imports ------------------------------------
==============================================================================*/

/*---------------------------------- Lowdb -----------------------------------*/
import { JSONFilePreset } from 'lowdb/node';

/*---------------------------------- Node -----------------------------------*/
import { fileURLToPath } from 'url';
import path from 'path';
import crypto from 'crypto';

/*==============================================================================
---------------------------------- Constants -----------------------------------
==============================================================================*/
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const dbPath      = path.resolve(__dirname, 'data/db.json');
const defaultData = { users: [] };
const db          = await JSONFilePreset(dbPath, defaultData);

// Stores the sessions in memory.
const sessions = {};

/*==============================================================================
------------------------------------- APIs -------------------------------------
==============================================================================*/
/**
 * Authenticates a user by email and password, creates a session token, and returns user info.
 *
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<Object>} An object with success, data, and optional error/description.
 */
export async function login(email, password) {
  // Logs the login attempt info.
  console.log('Login attempt:', email, password);
  // Checks if the user exists in the database for a simple auth.
  const user = db.data.users.find(u => u.email === email && u.password === password);
  // If the user exists, create a session token and return it.
  if(user) {
    const token = crypto.randomUUID();
    sessions[token] = user.guid;
    // Add id_entity to user and session
    const userWithEntity = { ...user, id_entity: 1, id: user._id };
    const sessionObj = { token, userGuid: user.guid, id_entity: 2, id: token };
    return {
      user       : userWithEntity,
      success    : true,
      data       : { USER: [userWithEntity], SESSION: [sessionObj] },
      description: 'Login successful.'
    };
  } else {
    return {
      success: false,
      data: { USER: [], SESSION: [] },
      error: 'Invalid credentials',
      description: 'Login failed.'
    };
  }
}

/**
 * Updates a specific field of a user profile identified by guid.
 * Supports nested fields (e.g., 'name.first').
 *
 * @param {string} userGuid - The user's globally unique identifier (guid).
 * @param {string} field - The field to update (dot notation for nested fields).
 * @param {*} value - The new value to assign to the field.
 * @returns {Promise<Object>} An object with success, data, and optional error/description.
 */
export async function edit_profile(userGuid, field, value) {
  // Gets the user from the database.
  const user = db.data.users.find(u => u.guid === userGuid);
  // If the user exists, try to update its information.
  if(user) {
    // Support nested fields (e.g., name.first)
    if(field.includes('.')) {
      const parts = field.split('.');
      let obj = user;
      for(let i = 0; i < parts.length - 1; i++) {
        obj = obj[parts[i]];
        if(!obj) { 
          break; }}
      if(obj) { 
        obj[parts[parts.length - 1]] = value; }} 
    else {
      user[field] = value; }
    await db.write();
    const userWithEntity = { ...user, id_entity: 1, id: user._id };
    return {
      success    : true,
      data       : { USER: [userWithEntity] },
      description: 'Profile updated.'
    };
  } else {
    return {
      success: false,
      data: { USER: [] },
      error: 'User not found',
      description: 'Profile update failed.'
    };
  }
}

/**
 * Recovers a user session using a session token (identified by guid).
 *
 * @param {string} token - The session token.
 * @returns {Promise<Object>} An object with success, data, and optional error/description.
 */
export async function recover_session(token) {
  const userGuid = sessions[token];
  if(!userGuid) {
    return {
      success    : false,
      data       : { USER: [], SESSION: [] },
      error      : 'Invalid token',
      description: 'Session recovery failed.'
    };
  }
  const user = db.data.users.find(u => u.guid === userGuid);
  if(user) {
    const userWithEntity = { ...user, id_entity: 1, id: user._id };
    const sessionObj = { token, userGuid, id_entity: 2, id: token };
    return {
      user       : userWithEntity,
      success    : true,
      data       : { USER: [userWithEntity], SESSION: [sessionObj] },
      description: 'Session recovered.'
    };
  } else {
    return {
      success    : false,
      data       : { USER: [], SESSION: [] },
      error      : 'User not found',
      description: 'Session recovery failed.'
    };
  }
}

/**
 * Closes the user session and removes all session tokens associated with the 
 * userGuid.
 *
 * @param {string} userGuid - The user's unique identifier.
 * @returns {Object} Result object with success and description.
 */
export function log_out(userGuid) {
  // Remove all session tokens associated with this userGuid
  for(const [token, guid] of Object.entries(sessions)) {
    if(guid === userGuid) {
      delete sessions[token]; }}
  return {
    'success'    : true,
    'description': 'Session closed.'
  }; };