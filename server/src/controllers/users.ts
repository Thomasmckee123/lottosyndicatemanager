import { Request, Response } from "express";
import { UserService } from "./../services/users";

const getAllUsers = async (req: Request, res: Response) => {
  const users = await UserService.getAll();
  return !users ? res.sendStatus(404) : res.status(200).json(users);
};
const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const user = await UserService.getUserById(Number(userId));
  return !user ? res.sendStatus(404) : res.status(200).json(user);
};
const UserController = {getAllUsers, getUserById};
export {UserController};