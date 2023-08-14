import { Request, Response } from "express";
import { GameService } from "../services/games";
import { TicketService } from "../services/tickets";

const getAllGames = async (req: Request, res: Response) => {
  const games = await GameService.getAll();
  return !games ? res.sendStatus(404) : res.status(200).json(games);
};

const getGamesById = async (req: Request, res: Response)=>{
  const { gameId } = req.params;

  const game= await GameService.getGamesByGameId(Number(gameId));
  return !game ? res.sendStatus(404) : res.status(200).json(game);
}
async function createGames(req: Request, res: Response) {
  try {
  
const newGames = {
 ...req.body,
  userSyndicateId:Number(req.params.syndicateId),
  gameTypeId:Number(req.params.gameTypesId)
  
}
  
    const createdGame = await GameService.createGameInSyndicate(newGames);
    return res.status(200).json(createdGame);
  } catch (error) {
    res.status(500).json("Could not create game.");
  }
}
async function getGamesBySyndicateId(req: Request, res: Response) {
  try {
    const syndicateId = Number(req.params["syndicateId"]);
    const games = await GameService.getGamesBySyndicateId(syndicateId);
    console.log(games)
    if(isNaN(syndicateId)){
      return res.status(400);
    }
    
      return res.status(200).json(games);
    
  } catch (error) {

    res.status(500).json({ "Cannot access database": error });
  }
}
async function getGamesByTypeId(req: Request, res: Response) {
  try {
    const gameTypeId = Number(req.params["gameTypeId"]);
    const games = await GameService.getGamesByTypeId(gameTypeId);
    if(isNaN(gameTypeId)){
      return res.status(400);
    }
    
      return res.status(200).json(games);
    
  } catch (error) {

    res.status(500).json({ "Cannot access database": error });
  }
}
//update syndicate details
async function UpdateGame(req: Request, res: Response) {
  try {
    
    let gameDetails={
      ...req.body,
      gameId: Number(req.params.id),
 
      maximumPlayers: req.body.maximumPlayers
      

    }
  
    const updatedGame= await GameService.updateGames(gameDetails);
    return res.status(200).json(updatedGame);
  } catch (error) {
    res.status(500).json("Could not update user.");
  }
}
//deleting a game by id
async function deleteGameById(req: Request, res: Response) {
  const gameId = Number(req.params.gameId);

  const deletedGame = await GameService.deleteGameById(gameId);
  if (!deletedGame) {
    return res.status(500).json("Cannot delete game");
  }
  return res.status(200).json(deletedGame);
}

const GameController = {getGamesByTypeId,getGamesById, getGamesBySyndicateId, getAllGames, createGames, UpdateGame, deleteGameById};
export {GameController};