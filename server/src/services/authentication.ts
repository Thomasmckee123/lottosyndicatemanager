import { UserService } from './users';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { authConst } from '../constants/auth';


const authenticate = async (email: string, password: string) => {
  const user = await UserService.getByEmail(email);
  if (user.length==1) {
    const passwordCorrect = await bcrypt.compare(password, user[0].password);
    const passwordCorrectNoEncrypt = password === user[0].password;
    if (passwordCorrect || passwordCorrectNoEncrypt) {
      return await generateTokens(user);
    }
  }
  throw new Error(`auth failed for ${email}`);
};


const refresh = async (userId: number) => {
  const user = await UserService.getUserById(userId);
  if (user) {
    return await generateTokens(user);
  }
  throw new Error(`Could not generate new token.`);
};


const generateTokens = (user) => {
  return new Promise((response, reject) => {
    try {
      const accessToken = jwt.sign(
        { sub: user.id},
        authConst.ACCESS_TOKEN_SECRET,
        {
          expiresIn: 1200,
        }
      );

      const refreshToken = jwt.sign(
        { sub: user.userId },
        authConst.REFRESH_TOKEN_SECRET,
        {
          expiresIn: 86400,
        }
      );
      response({ accessToken, refreshToken });
    } catch (error) {
      reject(error);
    }
  });
};
const AuthService = {
  authenticate,
  refresh,
};
export { AuthService };