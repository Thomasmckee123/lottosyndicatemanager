import express from "express";
import { UserController } from "../controllers/users";

const UserRouter = express.Router();

UserRouter.get("/", UserController.getAllUsers);

export { UserRouter }; 