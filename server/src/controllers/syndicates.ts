import { Request, Response } from "express";
import { SyndicateService } from "./../services/syndicates";

const getAllSyndicates = async (req: Request, res: Response) => {
  const syndicates = await SyndicateService.getAll();
  return !syndicates ? res.sendStatus(404) : res.status(200).json(syndicates);
};
const SyndicateController = {getAllSyndicates};
export {SyndicateController};