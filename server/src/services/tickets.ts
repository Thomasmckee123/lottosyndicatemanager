import {prisma} from "../utils/prisma"
import { ITicket } from "../interfaces";

//getting all tickets
const getAll = async () => {
    const allTickets = await prisma.game_user_game_ticket.findMany({
    select:{
        id: true,
        ticket_code: true,
        total_reward_value: true,
        ticket_status:{
            select:{
                id: true,
                name: true,
            },
        
        },
        games:{ select:{
          id: true,
        treasury: true,
        game_types:{
         select:{
         id: true,
         name: true,
         draw_date: true,
         reward: true,
         image: true,
        ticket_cost:true}
        },
         user_syndicates:{
           select:{
             start_date: true,
             users:{
               select:{
                 id: true,
                 first_name: true,
                 last_name: true,
                 email: true,  
                 balance:true
               }}}}}


    }
  
  }}); 
    const alteredTickets: ITicket[] = allTickets.map(x => ({
      id: x.id,
      ticketCode: x.ticket_code,
      totalRewardValue: x.total_reward_value,
      ticketStatus: {
          id: x.ticket_status.id,
          name: x.ticket_status.name
      },games:{
      id: x.games.id,
      treasury: x.games.treasury,
      gameTypes: {
          id: x.games.game_types.id,
          name: x.games.game_types.name,
          drawDate: x.games.game_types.draw_date,
          reward: x.games.game_types.reward,
          image: x.games.game_types.image,
          ticketCost: x.games.game_types.ticket_cost
      },
      userSyndicates: {
          startDate: x.games.user_syndicates.start_date,
          users: {
              id: x.games.user_syndicates.users.id,
              firstName: x.games.user_syndicates.users.first_name,
              lastName: x.games.user_syndicates.users.last_name,
              email: x.games.user_syndicates.users.email,
              balance: x.games.user_syndicates.users.balance
          }
      }
  }}));
  
  const filteredTickets = alteredTickets.filter(ticket => ticket.games.userSyndicates.users.firstName !== "DELETEDUSER");
  
  return filteredTickets;
}
  //geting tickets of a particular game Id

  async function ticketsByGameId(gameId: number) {
    let ticketsByGameId ;
  
    try {
      ticketsByGameId = await prisma.game_user_game_ticket.findMany({
        where: {
          games:{
            id : gameId
          },
        },   
          select:{
            id: true,
            ticket_code: true,
            total_reward_value: true,
            ticket_status:{
                select:{
                    id: true,
                    name: true,
                },
            
            },
            games:{ select:{
              id: true,
            treasury: true,
            game_types:{
             select:{
             id: true,
             name: true,
             draw_date: true,
             reward: true,
             image: true,
            ticket_cost:true}
            },
             user_syndicates:{
               select:{
                 start_date: true,
                 users:{
                   select:{
                     id: true,
                     first_name: true,
                     last_name: true,
                     email: true,  
                     balance:true
                   }}}}}
    
    
        }
          }
      }); 
        const alteredTickets: ITicket[] = ticketsByGameId.map(x => ({
          id: x.id,
          ticketCode: x.ticket_code,
          totalRewardValue: x.total_reward_value,
          ticketStatus: {
              id: x.ticket_status.id,
              name: x.ticket_status.name
          },games:{
          id: x.games.id,
          treasury: x.games.treasury,
          gameTypes: {
              id: x.games.game_types.id,
              name: x.games.game_types.name,
              drawDate: x.games.game_types.draw_date,
              reward: x.games.game_types.reward,
              image: x.games.game_types.image,
              ticketCost:x.games.game_types.ticket_cost
          },
          userSyndicates: {
              startDate: x.games.user_syndicates.start_date,
              users: {
                  id: x.games.user_syndicates.users.id,
                  firstName: x.games.user_syndicates.users.first_name,
                  lastName: x.games.user_syndicates.users.last_name,
                  email: x.games.user_syndicates.users.email,
                  balance: x.games.user_syndicates.users.balance
              }
          }
      }}));
      
      const filteredTickets = alteredTickets.filter(ticket => ticket.games.userSyndicates.users.firstName !== "DELETEDUSER");
      
      return filteredTickets;
    }catch(error){
      console.error(error)
    }
  }

  
  async function createTicketsByGameId(ticket: any) {
    try {
  
    const newGame  = await prisma.game_user_game_ticket.create({
      data: {
    ticket_code: ticket.ticketCode,
    total_reward_value: ticket.totalRewardValue,
    ticket_status_id: ticket.ticketStatusId,
    game_id: ticket.gameId
    
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
      updateTicket = await prisma.game_user_game_ticket.update({
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
     
          
      const deletedTicket = await prisma.game_user_game_ticket.delete({
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
  

  const TicketService = {deleteTicketsById, getAll, ticketsByGameId,createTicketsByGameId, updateTickets};
  export {TicketService};
