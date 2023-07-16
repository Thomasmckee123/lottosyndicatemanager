import express from "express";
import { BoardsController } from "../controllers/boards";

const BoardsRouter = express.Router();

BoardsRouter.get("/", BoardsController.getAllBoards);
BoardsRouter.get("/syndicate/:syndicateId",BoardsController.getBoardsBySyndicateId);
BoardsRouter.post("/create",BoardsController.createBoard);
BoardsRouter.delete("/delete/:boardId",BoardsController.deleteBoardById);
export { BoardsRouter }; 