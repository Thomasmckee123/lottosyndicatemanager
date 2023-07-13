import express from "express";
import { GameController } from "../controllers/games";

const GamesRouter = express.Router();

GamesRouter.get("/", GameController.getAllGames);

export { GamesRouter }; 