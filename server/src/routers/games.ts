import express from "express";
import { GameController } from "../controllers/games";

const GamesRouter = express.Router();

GamesRouter.get("/", GameController.getAllGames);
GamesRouter.post("/create/syndicates/:id",GameController.createGames);
GamesRouter.put("/update/:id",GameController.UpdateGame);
GamesRouter.delete("/delete/:gameId",GameController.deleteGameById);
export { GamesRouter }; 