/**
 * Used to perform all authentication-related operations
 * For example, generating a token, getting the username, etc.
 */
import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function generateJWT(user: any) {
  const tokenData = { username: user.username, id: user._id, role: user.role };
  return jwt.sign({ user: tokenData }, process.env.TOKEN_SECRET);
}

export function requireLogin(req: Request, res: Response, next: NextFunction) {
  const token = decodeToken(req);
  if (!token) {
    return res.status(401).json({ message: 'You must be logged in.' });
  }
  next();
}

export function requireLoginAndAdmin(req: Request, res: Response, next: NextFunction) {
  const token: any = decodeToken(req);
  if (!token) {
    return res.status(401).json({ message: 'You must be logged in.' });
  }
  if (token.user.role !== 255) {
    return res.status(401).json({ message: 'Not admin!' });
  }
  next();
}



/**
 * Will verify that the token came from this application (using secret). Then,
 * will decode it and grab the signed data (username, etc.) and return decoded token
 * @param {HTTP Request} req
 */
export function decodeToken(req: Request) {
  const token = req.headers.authorization || req.headers.authorization;

  if (!token) {
    return null;
  }

  try {
    return jwt.verify(token, process.env.TOKEN_SECRET);
  } catch (error) {
    return null;
  }
}

export function getUsername(req: Request) {
  const token: any = decodeToken(req);
  if (!token) {
    return null;
  }
  return token.user.username;
}

export function getUserId(req: Request) {
  const token: any = decodeToken(req);
  if (!token) {
    return null;
  }
  return token.user.id;
}
