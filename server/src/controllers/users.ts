import { Request, Response } from "express";
import { UserService } from "./../services/users";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserService.getAll();
    return !users ? res.sendStatus(404) : res.status(200).json(users);
  } catch (error) {
    res.status(500).json("Could not get users.");
  }
};
const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
  const user = await UserService.getUserById(Number(userId));
  return !user ? res.sendStatus(404) : res.status(200).json(user);
} catch (error) {
  res.status(500).json("Could not get users.");
}
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
async function updateBalance(req: Request, res: Response){
try{
    const { userId } = res.locals;
    const {balance } = req.body;
    console.log("locals", JSON.stringify(res.locals))
    const updatedBalance = await UserService.depositMoney(userId, balance);
    return res.status(200).json(updatedBalance)
}catch(error){
    res.status(500).json("Could not update balance")
}
}

async function takePhoto(req: Request, res: Response){
try{
    const { userId } = req.params;
    console.log("USERID", userId)
    
    let photo = `https://lottosyndicatebucket.s3.eu-west-1.amazonaws.com/users/${userId}/profileImage.jpeg`
    console.log("PHOTO", photo)
    const updateImage = await UserService.takePhoto(photo, Number(userId));
    return res.status(200).json(updateImage)
}catch(error){
    res.status(500).json("Could not update image")
}
}
async function deleteUserById(req: Request, res: Response)    {
  try{
  const  deleteData =  Number(req.params.userId);
    
  
  console.log(deleteData);
  const deletedUser = await UserService.deleteUserById(deleteData);
  if (!deletedUser)  {
    return res.status(500).json("Cannot delete id");
  }
  return res.status(200).json(deletedUser);
}catch(error){
  res.status(500).json("Could not delete user");
}
}

const UserController = {takePhoto,updateBalance, deleteUserById, getAllUsers, getUserById,updateUserDetails, };
export {UserController};