import { Request, Response } from "express";
import { UserService } from "./../services/users";

async function createUser(req: Request, res: Response) {
    try {
      const newUser = req.body;
      const createdUser = await UserService.createUser(newUser);
      return res.status(200).json(createdUser);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  const SignUpController = { createUser};
  export {SignUpController};