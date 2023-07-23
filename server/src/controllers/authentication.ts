import { Request, Response } from 'express';
import { AuthService } from './../services/authentication';
import { StatusCodes } from 'http-status-codes';

const authenticate = async (req: Request, res: Response) => {
  try {
    const { email_address, password } = req.body;
    const authenticationTokens = await AuthService.authenticate(
      email_address,
      password
    );
    res.status(200).json(authenticationTokens);
  } catch (err) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json('Could not authenticate the user');
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