import express from "express";
import { UserController } from "../controllers/users";

const UserRouter = express.Router();

UserRouter.get("/", UserController.getAllUsers);
UserRouter.get("/:userId", UserController.getUserById); 
UserRouter.post("/create", UserController.createUser);
UserRouter.put("/update/:userId", UserController.updateUserDetails);
UserRouter.post("/:userId/syndicates/:syndicateId",UserController.createUserSyndicate)
UserRouter.put("/delete/:userId",UserController.deleteUserById);
export { UserRouter }; 

