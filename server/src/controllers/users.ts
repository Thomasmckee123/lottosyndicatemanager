import { Request, Response } from "express";
import { UserService } from "./../services/users";

const getAllUsers = async (req: Request, res: Response) => {
  try{
  const users = await UserService.getAll();
  return !users ? res.sendStatus(404) : res.status(200).json(users);
}catch
{ 
 return res.sendStatus(500)}
};
const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const user = await UserService.getUserById(Number(userId));
  return !user ? res.sendStatus(404) : res.status(200).json(user);
};



async function updateUserDetails(req: Request, res: Response) {
  try {
    const { userId } =  req.params; 
    let userDetails = req.body;
    userDetails["id"] = Number(userId);
    const updatedUser = await UserService.updateUserDetails(userDetails);
    return res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json("Could not update user.");
  }
}


async function deleteUserById(req: Request, res: Response)    {
  const  deleteData =  Number(req.params.userId);
    
  
  console.log(deleteData);
  const deletedUser = await UserService.deleteUserById(deleteData);
  if (!deletedUser)  {
    return res.status(500).json("Cannot delete id");
  }
  return res.status(200).json(deletedUser);
}

const UserController = {deleteUserById, getAllUsers, getUserById,updateUserDetails, };
export {UserController};