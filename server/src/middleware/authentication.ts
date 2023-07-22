import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { authConst } from '../constants/auth';
import { StatusCodes } from 'http-status-codes';

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = authConst;

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  if (
    (req.path === '/authenticate' || req.path === '/signup') &&
    req.method == 'POST'
  )
    return next();

  const splitAuth = req.headers.authorization?.split(' ');
  const token = splitAuth && splitAuth.length >= 2 && splitAuth[1];

  if (token) {
    try {
      const tokenVerified = checkTokenValidity(
        token,
        req.path === '/authenticate/refresh'
          ? REFRESH_TOKEN_SECRET
          : ACCESS_TOKEN_SECRET
      );

      if (tokenVerified) {
        res.locals.userId = tokenVerified.sub;
        return next();
      }
    } catch {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: 'access not permitted',
      });
    }
  }
  res.status(StatusCodes.UNAUTHORIZED).json({
    error: 'access not permitted',
  });
};

const checkTokenValidity = (token, secret) => {
  return jwt.verify(token, secret);
};

export { verifyToken };