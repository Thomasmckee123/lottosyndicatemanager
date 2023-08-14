import express from "express";
import { body } from "express-validator";
import { resolver } from "../middleware/_resolver";
import GameTypesController from "../controllers/gameTypes";

const GameTypesRouter = express.Router();


GameTypesRouter.get('/', GameTypesController.getAllGameTypes)
GameTypesRouter.get('/:gameTypeId',GameTypesController.getGameTypesById);

export{GameTypesRouter};