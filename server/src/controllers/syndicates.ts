import { Request, Response } from "express";
import { SyndicateService } from "./../services/syndicates";

const getAllSyndicates = async (req: Request, res: Response) => {
  const syndicates = await SyndicateService.getAll();
  return !syndicates ? res.sendStatus(404) : res.status(200).json(syndicates);
};
async function getSyndicatesByUserId(req: Request, res: Response) {
    try {
      const userId = Number(req.params["userId"]);
      const syndicates = await SyndicateService.getSyndicatesByUserId(userId);
      console.log(syndicates)
      if(isNaN(userId)){
        return res.status(400);
      }
      
        return res.status(200).json(syndicates);
      
    } catch (error) {
 
      res.status(500).json({ "Cannot access database": error });
    }
  }
  //creating a user.
  async function createSyndicate(req: Request, res: Response) {
    try {
      const newSyndicate = {
        ...req.body,
        user_id: req.query.user_id as string,  // Get user_id from query parameters
      };
      const createdSyndicate = await SyndicateService.createSyndicate(newSyndicate);
      return res.status(200).json(createdSyndicate);
    } catch (error) {
      res.status(500).json("Could not create user.");
    }
  }
//update syndicate details
  async function UpdateSyndicateDetails(req: Request, res: Response) {
    try {
      const { syndicateId } =  req.params; 
      let syndicateDetails = req.body;
      syndicateDetails["id"] = Number(syndicateId);
      const updatedSyndicate= await SyndicateService.updateSyndicateDetails(syndicateDetails);
      return res.status(200).json(updatedSyndicate);
    } catch (error) {
      res.status(500).json("Could not update user.");
    }
  }

async function deleteSyndicateById(req: Request, res: Response)    {
  const  deleteData =  Number(req.params.syndicateId);
    
  
  console.log(deleteData);
  const deletedSyndicate = await SyndicateService.deleteSyndicateById(deleteData);
  if (!deletedSyndicate)  {
    return res.status(500).json("Cannot delete id");
  }
  return res.status(200).json(deletedSyndicate);
}
const SyndicateController = {getAllSyndicates, getSyndicatesByUserId, createSyndicate, UpdateSyndicateDetails,deleteSyndicateById};
export {SyndicateController};