import {prisma} from "../utils/prisma"
import { ITicket } from "../interfaces";

//getting all tickets
const getAll = async () => {
    const allTickets = await prisma.game_user_syndicates_ticket.findMany({
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
    const alteredTickets: ITicket[] = allTickets.map((x: { id: number; ticket_code: string; total_reward_value: number; ticket_status: {id: number; name: string;},user_syndicates:{id: number; users:{id:number; first_name:string; last_name: string}}, game_id: number }) => ({
      id: x.id,
    ticketCode: x.ticket_code,
    totalRewardValue: x.total_reward_value,
    ticketStatus: {  
        id: x.ticket_status.id,
        name: x.ticket_status.name
    },userSyndicates:{
      id:x.user_syndicates.id,
      users:{
      id: x.user_syndicates.users.id,
      firstName: x.user_syndicates.users.first_name,
      lastName: x.user_syndicates.users.last_name
      }
    }, 
    gameId: x.game_id
}));
    const filteredTickets = alteredTickets?.filter((ticket) => ticket.userSyndicates.users.firstName !== "DELETEDUSER");

     return filteredTickets;
  };

  //geting tickets of a particular game Id

  async function ticketsByGameId(gameId: number) {
    let ticketsByGameId ;
  
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
        const alteredTickets: ITicket[] =  ticketsByGameId .map((x: { id: number; ticket_code: string; total_reward_value: number; ticket_status: {id: number; name: string;},user_syndicates:{id: number; users:{id:number; first_name:string; last_name: string}}, game_id: number }) => ({
        id: x.id,
      ticketCode: x.ticket_code,
      totalRewardValue: x.total_reward_value,
      ticketStatus: {  
          id: x.ticket_status.id,
          name: x.ticket_status.name
      },userSyndicates:{
        id:x.user_syndicates.id,
        users:{
        id: x.user_syndicates.users.id,
        firstName: x.user_syndicates.users.first_name,
        lastName: x.user_syndicates.users.last_name
        }
      }, 
      gameId: x.game_id
  }));
    return alteredTickets;
  }
  
  async function createTicketsByGameAndUserSyndicateId(ticket: any) {
    try {
  
    const newGame = await prisma.game_user_syndicates_ticket.create({
      data: {
    ticket_code: ticket.ticketCode,
    total_reward_value: ticket.totalRewardValue,
    ticket_status_id: ticket.ticketStatusId,
    user_syndicate_id: ticket.userSyndicateId,
    game_id: ticket.gameid
    
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
       ticket_status_id: ticket.ticketStatusId,
       total_reward_value: ticket.totalRewardValue
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
