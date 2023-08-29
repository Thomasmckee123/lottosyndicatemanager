import { Request, Response } from "express";
import { MessageService } from "../services/messages";
import { GameService } from "../services/games";

const getAllMessages = async (req: Request, res: Response) => {
  const messages = await MessageService.getAll();
  return !messages ? res.sendStatus(404) : res.status(200).json(messages);
};
async function getMessagesByBoardsId(req: Request, res: Response) {
    try {
      
      const boardsId= Number(req.params["boardId"]);
      if(isNaN(boardsId)){
        return res.status(400)
      }
      const messages= await MessageService.getMessagesByBoardsId(boardsId);
      
      return res.status(200).json(messages);
    } catch (error) {
 
      res.status(500).json({ "Cannot access database": error });
    }
  }
  async function createNewMessageInBoard(req: Request, res: Response) {
    try {
      const newBoard = {...req.body,
        
      createdDate: new Date(),
      userGameId: Number(req.params.userGameId),
      boardId: Number(req.params.boardId)
      
      
      };
      const createdBoard = await MessageService.createMessageInBoard(newBoard);
      return res.status(200).json(createdBoard);
    } catch (error) {
      res.status(500).json("Could not create message");
    }
  }


//deleting messages
  async function deleteMessageById(req: Request, res: Response)    {
    const  deleteData =  Number(req.params.messageId);
      
    
    console.log(deleteData);
    const deletedMessage = await MessageService.deleteMessageById(deleteData);
    if (!deletedMessage)  {
      return res.status(500).json("Cannot delete Message");
    }
    return res.status(200).json(deletedMessage);
  }
const MessagesController = {createNewMessageInBoard,getAllMessages,getMessagesByBoardsId, deleteMessageById};
export {MessagesController};
