import exp from "constants";
import { GameTypeService } from "../services/gameTypes";
import { Request, Response } from "express";

const getAllGameTypes = async (req: Request, res: Response) => {
    const gameTypes = await GameTypeService.getAll();
    return !gameTypes ? res.sendStatus(404) : res.status(200).json(gameTypes);
  };

  const getGameTypesById = async (req: Request, res: Response)=>{
    const { gameTypeId } = req.params;
  
    const gameType= await GameTypeService.getGameTypeById(Number(gameTypeId));
    return !gameType ? res.sendStatus(404) : res.status(200).json(gameType);
  }

  const GameTypesController ={getAllGameTypes, getGameTypesById}
  export default GameTypesController