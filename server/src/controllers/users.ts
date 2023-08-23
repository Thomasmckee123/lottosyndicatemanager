import { Request, Response } from "express";
import { UserService } from "./../services/users";
import jwt_decode from "jwt-decode";
interface IDecodedToken {
  sub: number;
  claims: {
    userId: number;
    email: string;
    firstName: string;
    balance: number;
  };
  iat: number;
  exp: number;
}

const getAllUsers = async (req: Request, res: Response) => {
  const users = await UserService.getAll();
  return !users ? res.sendStatus(404) : res.status(200).json(users);
};
const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const user = await UserService.getUserById(Number(userId));
  return !user ? res.sendStatus(404) : res.status(200).json(user);
};

async function updateUserDetails(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    let userDetails = req.body;
    userDetails["id"] = Number(userId);
    const updatedUser = await UserService.updateUserDetails(userDetails);
    return res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json("Could not update user.");
  }
}
async function updateBalance(req: Request, res: Response) {
  const splitBearer = req.headers.authorization?.split(" ");
  if (splitBearer) {
    const decodedToken = jwt_decode<IDecodedToken>(splitBearer[1]);
    const { userId, balance } = decodedToken.claims;
    const updatedBalance = await UserService.depositMoney(userId, balance);
    return res.status(200).json(updatedBalance);
  }
}

async function takePhoto(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    let photo = req.body;
    photo["id"] = Number(userId);
    const updatedBalance = await UserService.takePhoto(photo);
    return res.status(200).json(updatedBalance);
  } catch (error) {
    res.status(500).json("could not add photo");
  }
}
async function deleteUserById(req: Request, res: Response) {
  const deleteData = Number(req.params.userId);

  console.log(deleteData);
  const deletedUser = await UserService.deleteUserById(deleteData);
  if (!deletedUser) {
    return res.status(500).json("Cannot delete id");
  }
  return res.status(200).json(deletedUser);
}

const UserController = {
  takePhoto,
  updateBalance,
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserDetails,
};
export { UserController };
