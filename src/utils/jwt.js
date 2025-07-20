
import jwt from 'jsonwebtoken';
import { env } from './env.js';

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, env('JWT_SECRET'));
  } catch {

    throw new Error('Token is not valid');
  }
};