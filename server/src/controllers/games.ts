import { Request, Response } from "express";
import { GameService } from "../services/games";

const getAllGames = async (req: Request, res: Response) => {
  const games = await GameService.getAll();
  return !games ? res.sendStatus(404) : res.status(200).json(games);
};
const GameController = {getAllGames};
export {GameController};