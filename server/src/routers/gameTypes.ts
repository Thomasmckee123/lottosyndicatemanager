import express from "express";
import { body } from "express-validator";
import GameTypesController from "../controllers/gameTypes";

const GameTypesRouter = express.Router();


GameTypesRouter.get('/', GameTypesController.getAllGameTypes)
GameTypesRouter.get('/:gameTypeId',GameTypesController.getGameTypesById);
GameTypesRouter.put('/:gameTypeId',GameTypesController.updateGameTypeStatus);
// GameTypesRouter.post('/autoCreateGames',GameTypesController.autoCreateGameTypes)
export{GameTypesRouter};