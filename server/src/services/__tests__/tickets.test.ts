import { ITicket } from '../../interfaces';
import { prismaAsAny } from '../../test-utils/prisma';
import { prisma } from '../../utils/prisma';
import { MessageService } from '../messages';
import { TicketService } from '../tickets';
import { UserService } from '../users';
//test values
const testTicket: ITicket[] = [{
    id: 1,
    ticket_code: "P3456A2",
    total_reward_value: 23032,
    ticket_status: {
      id: 1,
      name: "Powerball",
    },
    user_syndicates: {
      id: 1,
      users: {
        id: 1,
        first_name: "Thomas",
        last_name: "Mckee",
      },
    },
    game_id: 1,
  
}

]

//for getting a game by Id
const testGameIdResult: ITicket[] = [{
    id: 1,
    ticket_code: "P3456A2",
    total_reward_value: 23032,
    ticket_status: {
      id: 1,
      name: "Powerball",
    },
    user_syndicates: {
      id: 1,
      users: {
        id: 1,
        first_name: "Thomas",
        last_name: "Mckee",
      },
    },
    game_id: 1,
  
  }];
  //for creating a ticket by game and syndicate id 
  const testCreateTicket = {
    ticket_code: "pa234dja",
    total_reward_value: 20000,
    ticket_status_id: 3,
    user_syndicate_id: 1,
    game_id: 2
    
  }
  const testUpdateTicket: ITicket = {
    
        id: 1,
        ticket_code: "P3456A2",
        total_reward_value: 23032,
        ticket_status: {
          id: 1,
          name: "Powerball",
        },
        user_syndicates: {
          id: 1,
          users: {
            id: 1,
            first_name: "Thomas",
            last_name: "Mckee",
          },
        },
        game_id: 1,
      
    }
    //testing the delete
    const testDeleteTicket ={
        id: 1
    }
  
/**
 * getting all the tickets
 * 
 */
describe("GET /tickets", () => {
    test("get all tickets", async () => {
      prismaAsAny.game_user_syndicates_ticket = {
        findMany: jest.fn().mockResolvedValueOnce(testTicket),
      };
      const result = await TicketService.getAll();
      expect(prisma.game_user_syndicates_ticket.findMany).toHaveBeenCalledTimes(1);
      expect(result).toEqual(testTicket);
    });

  });

  /**
   * getting tickets by ticket Id
   */
  describe("getTicketById", () => {
    it("should return a ticket with their game id", async () => {
      prismaAsAny.game_user_syndicates_ticket = {
        findMany: jest.fn().mockReturnValueOnce(testGameIdResult),
      };
      const result = await TicketService.ticketsByGameId(1);
      console.log(result)
     
      expect(prisma.game_user_syndicates_ticket.findMany).toHaveBeenCalledTimes(1);
      
      if(result){
      expect(result).toEqual(testGameIdResult);
    }
    });
  });
/**
 * creating tickets by game and user syndicate Id
 */
  describe("/POST /createTicketByGameAndUserSyndicate", () => {
 
    it("should create a new ticket", async () => {
      prismaAsAny.game_user_syndicates_ticket = { 
        create: jest.fn().mockResolvedValueOnce(testCreateTicket),
    };

  const result = await TicketService.createTicketsByGameAndUserSyndicateId(testCreateTicket);
  console.log("hi"+result)
  expect(prisma.game_user_syndicates_ticket.create).toHaveBeenCalledTimes(1);
  expect(result).toEqual(testCreateTicket.ticket_code);
      
    });
  
  
  });
  /**
   * 
   * updating tickets by id
   */
  describe("PUT /tickets/:id", () => {
    it("should get update ticket by id", async () => {
      prismaAsAny.game_user_syndicates_ticket= {
        update: jest.fn().mockReturnValueOnce(testUpdateTicket),
      };

      const result = await TicketService.updateTickets(testUpdateTicket);
      expect(prisma.game_user_syndicates_ticket.update).toHaveBeenCalledTimes(1);
      expect(result).toEqual(testUpdateTicket);
    });
  });

    /**
       * deleting a ticket
       */
    describe('DELETE/deleteTicketsById', () => {
        it('should delete the review by ID', async () => {
            prismaAsAny.game_user_syndicates_ticket= {
                delete: jest.fn().mockResolvedValueOnce(testDeleteTicket)
            }
       
      
          
          const result = await TicketService.deleteTicketsById(testDeleteTicket.id);
      
          console.log(result);
          expect(prisma.game_user_syndicates_ticket.delete).toHaveBeenCalledTimes(1);
      
          expect(result).toEqual(testDeleteTicket);
        });
      });