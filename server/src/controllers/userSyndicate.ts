import { Request, Response } from "express";
import {UserSyndicateService } from "./../services/userSyndicates";
const getUserSyndicateByUserSyndicteId = async(req: Request, res: Response)=>{
  try {
    const {userSyndicateId }= req.params;
  
    const userSyndicate = await UserSyndicateService.getUserSyndicateByUserSyndicteId(Number(userSyndicateId))
    return !userSyndicate ? res.sendStatus(404) : res.status(200).json(userSyndicate);
  } catch (error) {
    res.status(500).json({ "Cannot access database": error });
  }
  }
  const getUserSyndicateById = async (req: Request, res: Response) => {
    try{
    const { syndicateId } = req.params;
  
    const user = await UserSyndicateService.getUserSyndicateBySyndicateId(Number(syndicateId));
    return !user ? res.sendStatus(404) : res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ "Cannot access database": error });
  }
  };
  async function getSyndicatesByUserId(req: Request, res: Response) {
    try {
      const userId = Number(req.params["userId"]);
      const syndicates = await UserSyndicateService.getSyndicatesByUserId(userId);
      console.log(syndicates)
      if(isNaN(userId)){
        return res.status(400);
      }
      
        return res.status(200).json(syndicates);
      
    } catch (error) {
 
      res.status(500).json({ "Cannot access database": error });
    }
  }
  async function createUserSyndicate(req: Request, res: Response) {
    try {
  console.log(req.body)
  const newUserSyndicate = {...req.body,
    startDate: req.body.startDate,
    
    userId: Number(req.params.userId),
   userSyndicateId: Number(req.params.syndicateId),
   roleId: Number(req.params.roleId)
  }
  
    
      const createNewSyndicate = await UserSyndicateService.createUserSyndicate(newUserSyndicate);
      return res.status(200).json(createNewSyndicate);
    } catch (error) {
      res.status(500).json("Could not create game.");
    }
  }
    async function updateUserSyndicate(req: Request, res: Response) {
    try {
      const { userSyndicateId } =  req.params; 
     
      let userSyndicate = req.body;
      userSyndicate["id"] = Number(userSyndicateId);
      const updatedUser = await UserSyndicateService.updateUserSyndicateDetails(userSyndicate);
      if(!updatedUser){
        return res.status(400);
      }else{
      return res.status(200).json(updatedUser)};
    } catch (error) {
      res.status(500).json("Could not update user.");
    }
  }
  async function deleteUserSyndicateById(req: Request, res: Response) {
    const userSyndicateId = Number(req.params.userSyndicateId);
  
    const deletedUserSyndicate = await UserSyndicateService.deleteUserSyndicateById(userSyndicateId);
    if (!deletedUserSyndicate) {
      return res.status(500).json("Cannot delete review");
    }
    return res.status(200).json("User syndicicate deleted");
  }
async function deleteUserSyndicateBySyndicateId(req: Request, res: Response) {
  
  const syndicateId = Number(req.params.syndicateId);
  const deletedUserSyndicate = await UserSyndicateService.deleteUserSyndicateById(syndicateId);
  if (!deletedUserSyndicate) {
    return res.status(500).json("Cannot delete review");
  }
  
  return res.status(200).json("User syndicicate deleted");

}
  const UserSyndicateController={
   deleteUserSyndicateBySyndicateId, updateUserSyndicate, deleteUserSyndicateById, createUserSyndicate, getSyndicatesByUserId,getUserSyndicateById, getUserSyndicateByUserSyndicteId
  }


  export{UserSyndicateController}