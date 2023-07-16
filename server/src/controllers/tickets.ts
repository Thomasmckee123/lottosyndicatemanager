import { Request, Response } from "express";
import { TicketService } from "./../services/tickets";
//returning all the tickets
const getAlltickets = async (req: Request, res: Response) => {
  const tickets = await TicketService.getAll();
  return !tickets ? res.sendStatus(404) : res.status(200).json(tickets);
};
//controller for tickets by game Id
async function getTicketsByGameId(req: Request, res: Response) {
    try {
      const gameId = Number(req.params["gameId"]);
       console.log(gameId)
      const tickets = await TicketService.ticketsByGameId(gameId);
     
     
      return res.status(200).json(tickets);
    } catch (error) {
 
      res.status(500).json({ "Cannot access database": error });
    }
  }

  
  async function createTickets(req: Request, res: Response) {
    try {
  console.log(req.body)
  const newTickets = {...req.body,
    total_reward_value: Number(req.body.total_reward_value),
    ticket_status_id: Number(req.body.ticket_status_id),
   user_syndicate_id: Number(req.params.syndicateId),
   game_id: Number(req.params.gameId)
  }
  
    
      const createTicket = await TicketService.createTicketsByGameAndUserSyndicateId(newTickets);
      return res.status(200).json(createTicket);
    } catch (error) {
      res.status(500).json("Could not create game.");
    }
  }



  async function updateTicketStatus(req: Request, res: Response) {
    try {
      

      let ticketDetails ={ ...req.body,
        id: Number(req.params.id),
        total_reward_value : Number(req.body.total_reward_value),
        ticket_status_id: Number(req.body.ticket_status_id)
      
      
      }
      const updatedUser = await TicketService.updateTickets(ticketDetails);
      return res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json("Could not update user.");
    }
  }
  async function deleteTicketById(req: Request, res: Response) {
    const ticketId = Number(req.params.ticketId);
  
    const deletedBoards = await TicketService.deleteTicketsById(ticketId);
    if (!deletedBoards) {
      return res.status(500).json("Cannot delete board");
    }
    return res.status(200).json(deletedBoards);
  }
const TicketController = {deleteTicketById,updateTicketStatus, getAlltickets, getTicketsByGameId,createTickets};
export {TicketController};