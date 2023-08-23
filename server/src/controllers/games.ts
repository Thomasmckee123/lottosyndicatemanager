import { Request, Response } from "express";
import { GameService } from "../services/games";
import { TicketService } from "../services/tickets";

const getAllGames = async (req: Request, res: Response) => {
  const games = await GameService.getAll();
  return !games ? res.sendStatus(404) : res.status(200).json(games);
};

const getGamesById = async (req: Request, res: Response) => {
  const { gameId } = req.params;
  const game = await GameService.getGamesByGameId(Number(gameId));
  return !game ? res.sendStatus(404) : res.status(200).json(game);
};

const getArchivedGames = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const archive = await GameService.archivedGames(Number(userId));
  if (!archive) {
    return res.sendStatus(404);
  }
  return res.status(200).json(archive);
};

async function createGames(req: Request, res: Response) {
  try {
    const newGames = {
      ...req.body,
      syndicateId: Number(req.params.syndicateId),
      gameTypeId: Number(req.params.gameTypesId),
    };

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
    console.log(games);
    if (isNaN(syndicateId)) {
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
    const syndicateId = Number(req.params["syndicateId"]);
    const games = await GameService.getGamesByTypeId(gameTypeId, syndicateId);
    if (isNaN(gameTypeId)) {
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
    let gameDetails = {
      ...req.body,
      gameId: Number(req.params.gameId),

    };

    const updatedGame = await GameService.updateGames(gameDetails);
    return res.status(200).json(updatedGame);
  } catch (error) {
    res.status(500).json("Could not update user.");
  }
}
async function archiveGame(req: Request, res: Response) {
  try {
    let gameDetails = {
      ...req.body,
      gameTypeId: Number(req.params.gameTypeId),
    };
    const updatedGame = await GameService.archiveGames(gameDetails);
    return res.status(200).json(updatedGame);
  } catch (error) {
    return res.status(500).json({ "cannot archive game": error });
  }
}

const GameController = {
  getArchivedGames,
  archiveGame,
  getGamesByTypeId,
  getGamesById,
  getGamesBySyndicateId,
  getAllGames,
  createGames,
  UpdateGame,
};
export { GameController };
