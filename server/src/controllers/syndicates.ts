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
      return res.status(200).json(syndicates);
    } catch (error) {
 
      res.status(500).json({ "Cannot access database": error });
    }
  }
const SyndicateController = {getAllSyndicates, getSyndicatesByUserId};
export {SyndicateController};