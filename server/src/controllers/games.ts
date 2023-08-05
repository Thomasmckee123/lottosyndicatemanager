import { Request, Response } from "express";
import { GameService } from "../services/games";
import { TicketService } from "../services/tickets";

const getAllGames = async (req: Request, res: Response) => {
  const games = await GameService.getAll();
  return !games ? res.sendStatus(404) : res.status(200).json(games);
};

async function createGames(req: Request, res: Response) {
  try {
console.log(req.body)
const newGames = {
  name: req.body.name,
  draw_date: new Date(req.body.draw_date),
  reward: Number(req.body.reward),
  imgae: req.body.image,
  required_ticket_number: req.body.required_ticket_number as string,
  user_syndicate_id:Number(req.params.id)
  
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
//update syndicate details
async function UpdateGame(req: Request, res: Response) {
  try {
    
    let gameDetails={
      ...req.body,
      id: Number(req.params.id),
      draw_date : new Date(req.body.draw_date),
      reward: Number(req.body.reward),
      image: req.body.image,
      required_ticket_number: req.body.required_ticket_number

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

const GameController = {getGamesBySyndicateId, getAllGames, createGames, UpdateGame, deleteGameById};
export {GameController};