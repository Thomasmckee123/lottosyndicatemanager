import { Request, Response } from "express";
import { AuthService } from "./../services/authentication";
import { StatusCodes } from "http-status-codes";
import jwt_decode from "jwt-decode";
interface IRefreshToken {
  iat: number;
  exp: number;
  sub: number;
}

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
      .json(err.message || "Could not authenticate user");
  }
};

const refresh = async (req: Request, res: Response) => {
  try {
    const bearerToken = req.headers.authorization;
    const refreshToken = bearerToken?.split(" ")[1];
    const decodedToken: IRefreshToken = jwt_decode(refreshToken!);
    const authenticationTokens = await AuthService.refresh(decodedToken.sub);
    res.status(StatusCodes.OK).json(authenticationTokens);
  } catch (err) {
    res.status(StatusCodes.UNAUTHORIZED).json("Could refresh authentication");
  }
};

const AuthController = { authenticate, refresh };

export { AuthController };
