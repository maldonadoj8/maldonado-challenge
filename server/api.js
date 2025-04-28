import { JSONFilePreset } from 'lowdb/node';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, 'data/db.json');
const defaultData = { users: [] };
const db = await JSONFilePreset(dbPath, defaultData);

const sessions = {};

export async function login(email, password) {
  console.log('Login attempt:', email, password);
  const user = db.data.users.find(u => u.email === email && u.password === password);
  if (user) {
    const token = crypto.randomUUID();
    sessions[token] = user.email;
    return { success: true, token, user };
  } else {
    return { success: false, error: 'Invalid credentials' };
  }
}

export async function edit_profile(email, newProfile) {
  const user = db.data.users.find(u => u.email === email);
  if (user) {
    Object.assign(user, newProfile);
    await db.write();
    return { success: true, updated: user };
  } else {
    return { success: false, error: 'User not found' };
  }
}

export async function recover_session(token) {
  const email = sessions[token];
  if (!email) return { success: false, error: 'Invalid token' };
  const user = db.data.users.find(u => u.email === email);
  return user ? { success: true, user } : { success: false, error: 'User not found' };
}