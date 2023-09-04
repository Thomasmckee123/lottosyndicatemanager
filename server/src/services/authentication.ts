import { UserService } from './users';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { authConst } from '../constants/auth';


const authenticate = async (email: string, password: string) => {
  const user = await UserService.getByEmail(email);
  if (user) {
    const passwordCorrect = await bcrypt.compare(password, user?.password);
    const passwordCorrectNoEncrypt = password === user?.password;
    if (passwordCorrect || passwordCorrectNoEncrypt) {
      return await generateTokens(user);
    }
  }
  throw new Error(`auth failed for ${email}`);
};


const refresh = async (userId: number) => {
  console.log("refresh");
  const user = await UserService.getUserById(userId);
  console.log("got user", user);
  if (user) {
    return await generateTokens(user);
  }
  throw new Error(`Could not generate new token.`);
};


const generateTokens = (user) => {
  return new Promise((response, reject) => {
    try {
    
      const accessToken = jwt.sign(
        { sub: user.id, claims:{userId: user.id,image:user.image, email: user.email, firstName: user.first_name, balance: user.balance}},
        authConst.ACCESS_TOKEN_SECRET,
        {
          expiresIn: 60000000,
        }
      );

      const refreshToken = jwt.sign(
        { sub: user.id },
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