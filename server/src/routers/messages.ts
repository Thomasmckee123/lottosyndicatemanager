import express from "express";
import { MessagesController } from "../controllers/messages";

const MessagesRouter = express.Router();
MessagesRouter.get("/",MessagesController.getAllMessages)
MessagesRouter.get("/board/:boardId", MessagesController.getMessagesByBoardsId);
MessagesRouter.post("/syndicates/:syndicateId/boards/:boardId", MessagesController.createNewMessageInBoard);
export { MessagesRouter }; 