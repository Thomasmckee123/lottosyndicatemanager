import {prisma} from "../utils/prisma"
import { ITicket } from "../interfaces";

//getting all tickets
const getAll = async () => {
    const allTickets: ITicket[] | null = await prisma.game_user_syndicates_ticket.findMany({
    select:{
        id: true,
        ticket_code: true,
        total_reward_value: true,
        ticket_status:{
            select:{
                id: true,
                name: true,
            },
        },user_syndicates:{
            select:{
                id: true, 
                users:{
                    select:{
                        id: true,
                        first_name: true,
                        last_name: true,
                    },
                },
     
            },  
        },
        game_id: true


    }
  
    }); 
    const filteredTickets = allTickets?.filter((ticket) => ticket.user_syndicates.users.first_name !== "DELETEDUSER");

     return filteredTickets;
  };

  //geting tickets of a particular game Id

  async function ticketsByGameId(gameId: number) {
    let ticketsByGameId : ITicket[]| null;
  
    try {
      ticketsByGameId = await prisma.game_user_syndicates_ticket.findMany({
        where: {
          game_id: gameId,
        },    select:{
          id: true,
          ticket_code: true,
          total_reward_value: true,
          ticket_status:{
              select:{
                  id: true,
                  name: true,
              },
          },user_syndicates:{
              select:{
                  id: true, 
                  users:{
                      select:{
                          id: true,
                          first_name: true,
                          last_name: true,
                      },
                  },
       
              },  
          },
          game_id: true
  
  
      }
      });
    } catch (error) {
      throw Error("Cannot get messages by game id", error);
    }
  
    return ticketsByGameId;
  }
  
  async function createTicketsByGameAndUserSyndicateId(ticket: any) {
    try {
  
    const newGame = await prisma.game_user_syndicates_ticket.create({
      data: {
    ticket_code: ticket.ticket_code,
    total_reward_value: ticket.total_reward_value,
    ticket_status_id: ticket.ticket_status_id,
    user_syndicate_id: ticket.user_syndicate_id,
    game_id: ticket.game_id
    
      },
    });
      return newGame.ticket_code;
    } catch(error) {
      console.log(error);
      throw Error("Cannot create game");
    }
  } 
  
  //update user details
  async function updateTickets(ticket: any) {
    let updateTicket;
    try {
      updateTicket = await prisma.game_user_syndicates_ticket.update({
        where: {
          id: ticket.id,
        },
        data: {
       ticket_status_id: ticket.ticket_status_id,
       total_reward_value: ticket.total_reward_value
        },          

      });
    } catch (error) {
      console.log(error);
    }
    return updateTicket;
  }
//deleting tickets
  async function deleteTicketsById(ticketId) {
    try {
     
          
      const deletedTicket = await prisma.game_user_syndicates_ticket.delete({
        where: {
          id: ticketId
        },
      });
      
      return deletedTicket;
      
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  

  const TicketService = {deleteTicketsById, getAll, ticketsByGameId,createTicketsByGameAndUserSyndicateId, updateTickets};
  export {TicketService};
