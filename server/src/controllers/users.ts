import { Request, Response } from "express";
import { UserService } from "./../services/users";

const getAllUsers = async (req: Request, res: Response) => {
  const users = await UserService.getAll();
  return !users ? res.sendStatus(404) : res.status(200).json(users);
};
const UserController = {getAllUsers};
export {UserController};