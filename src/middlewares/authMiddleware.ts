// middleware/authMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface AuthenticatedRequest extends Request {
  user?: { userId: string };
}

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const secret = process.env.JWT_SECRET || 'yourSecret';
    const decoded = jwt.verify(token, secret);

    // Ensure the token is a payload object, not a string
    if (typeof decoded === 'object' && 'userId' in decoded) {
      req.user = { userId: (decoded as JwtPayload).userId }; // Typecast and assign
    } else {
      return res.status(401).json({ message: 'Invalid token payload' });
    }

    next();
  } catch (error) {
    return res.status(403).json({ message: 'Unauthorized' });
  }
};
