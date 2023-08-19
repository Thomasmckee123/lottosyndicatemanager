import { Request, Response } from 'express';
import { AuthService } from './../services/authentication';
import { StatusCodes } from 'http-status-codes';

const authenticate = async (req: Request, res: Response) => {
  try {
    const { emailAddress, password } = req.body;
    const authenticationTokens = await AuthService.authenticate(
      emailAddress,
      password
    );
    res.status(200).json(authenticationTokens);
  } catch (err) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json(err.message || 'Could not authenticate user');
  }
};

const refresh = async (req: Request, res: Response) => {
  try {
    const { userId } = res.locals;
    const authenticationTokens = await AuthService.refresh(userId);
    res.status(StatusCodes.OK).json(authenticationTokens);
  } catch (err) {
    res.status(StatusCodes.UNAUTHORIZED).json('Could refresh authentication');
  }
};

const AuthController = { authenticate, refresh};

export { AuthController };