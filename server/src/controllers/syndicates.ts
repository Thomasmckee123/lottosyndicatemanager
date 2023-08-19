import { Request, Response } from "express";
import { SyndicateService } from "./../services/syndicates";

const getAllSyndicates = async (req: Request, res: Response) => {
  const syndicates = await SyndicateService.getAll();
  return !syndicates ? res.sendStatus(404) : res.status(200).json(syndicates);
};
const getSyndicatesById = async (req: Request, res: Response) => {
  const { syndicateId } = req.params;
  

  const syndicate= await SyndicateService.getSyndicateById(Number(syndicateId));
  return !syndicate ? res.sendStatus(404) : res.status(200).json(syndicate);
};

const getSyndicateByName = async(req:Request, res:Response)=>{
  try{
  const {name} = req.params;
const syndicates = await SyndicateService.getSyndicateByName(name);
return !syndicates ? res.sendStatus(404) : res.status(200).json(syndicates);
  }catch(error){
    console.error("error getting syndicates by name",error)
  }

}

  //creating a user.
  async function createSyndicate(req: Request, res: Response) {
    try {
      const newSyndicate = {
        ...req.body,
       ownerId: Number(req.params.ownerId),  // Get user_id from query parameters
      };
      const createdSyndicate = await SyndicateService.createSyndicate(newSyndicate);
      return res.status(200).json(createdSyndicate);
    } catch (error) {
      res.status(500).json("Could not create syndicate.");
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
const SyndicateController = {getSyndicateByName,getSyndicatesById, getAllSyndicates, createSyndicate, UpdateSyndicateDetails,deleteSyndicateById};
export {SyndicateController};