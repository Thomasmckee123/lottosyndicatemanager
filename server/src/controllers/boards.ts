import { Request, Response } from "express";
import { BoardsService } from "../services/boards";

const getAllBoards = async (req: Request, res: Response) => {
  const boards = await BoardsService.getAll();
  return !boards ? res.sendStatus(404) : res.status(200).json(boards);
};
async function getBoardsByGameId(req: Request, res: Response) {
    try {
      const gameId = Number(req.params["gameId"]);
      const boards= await BoardsService.getBoardsByGameId(gameId);
      console.log(boards)
      return res.status(200).json(boards);
    } catch (error) {
 
      res.status(500).json({ "Cannot access database": error });
    }
  }
  async function createBoard(req: Request, res: Response) {
    try {
      let newBoard={
        ...req.body,
  gameId : Number(req.params.gameId)
  
      }
      const createdBoard = await BoardsService.createBoards(newBoard);
      return res.status(200).json(createdBoard);
    } catch (error) {
      res.status(500).json("Could not create game.");
    }
  }


  async function deleteBoardById(req: Request, res: Response) {
    const boardId = Number(req.params.boardId);
  
    const deletedBoards = await BoardsService.deleteBoardsById(boardId);
    if (!deletedBoards) {
      return res.status(500).json("Cannot delete board");
    }
    return res.status(200).json(deletedBoards);
  }


  async function UpdateBoards(req: Request, res: Response) {
    try {
      const { boardId } =  req.params; 
      let boardDetails = req.body;
      boardDetails["id"] = Number(boardId);
      const updatedBoard= await BoardsService.updateBoards(boardDetails);
      return res.status(200).json(updatedBoard);
    } catch (error) {
      res.status(500).json("Could not update Board.");
    }
  }
const BoardsController = {getAllBoards, getBoardsByGameId,createBoard, deleteBoardById, UpdateBoards};
export {BoardsController};
