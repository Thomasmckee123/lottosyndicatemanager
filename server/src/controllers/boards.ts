import { Request, Response } from "express";
import { BoardsService } from "../services/boards";

const getAllBoards = async (req: Request, res: Response) => {
  const boards = await BoardsService.getAll();
  return !boards ? res.sendStatus(404) : res.status(200).json(boards);
};
async function getBoardsBySyndicateId(req: Request, res: Response) {
    try {
      const syndicateId = Number(req.params["syndicateId"]);
      const boards= await BoardsService.getBoardsBySyndicateId(syndicateId);
      console.log(boards)
      return res.status(200).json(boards);
    } catch (error) {
 
      res.status(500).json({ "Cannot access database": error });
    }
  }
  async function createBoard(req: Request, res: Response) {
    try {
      const newBoard = req.body;
      const createdBoard = await BoardsService.createBoards(newBoard);
      return res.status(200).json(createdBoard);
    } catch (error) {
      res.status(500).json("Could not create user.");
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
const BoardsController = {getAllBoards, getBoardsBySyndicateId,createBoard, deleteBoardById};
export {BoardsController};
