
import { prismaAsAny } from '../../test-utils/prisma';
import { prisma } from '../../utils/prisma';
import { TicketService } from '../tickets';

jest.mock("@prisma/client");  


describe('Tickets Service', () => {

let testTicketData = [
    {
        "id": 1,
        "ticket_code": "123456",
        "total_reward_value": 0,
        "ticket_status": {
            "id": 3,
            "name": "pending"
        },
        "games": {
            "id": 1,
            "treasury": 0,
            "game_types": {
                "id": 1,
                "name": "euro millions",
                "draw_date": "2023-08-18T00:00:00.000Z",
                "reward": 43000000,
                "image": "euromillions.png",
                "ticket_cost": 2.5
            },
            "user_syndicates": {
                "start_date": "2023-07-13T00:00:00.000Z",
                "users": {
                    "id": 1,
                    "first_name": "John",
                    "last_name": "Doe",
                    "email": "JohnDoe@Gmail.com",
                    "balance": 0
                }
            }
        }
    }
]

const testTicketResponse = [{
    "id": 1,
    "ticketCode": "123456",
    "totalRewardValue": 0,
    "ticketStatus": {
        "id": 3,
        "name": "pending"
    },
    "games": {
        "id": 1,
        "treasury": 0,
        "gameTypes": {
            "id": 1,
            "name": "euro millions",
            "drawDate": "2023-08-18T00:00:00.000Z",
            "reward": 43000000,
            "image": "euromillions.png",
            "ticketCost": 2.5
        },
        "userSyndicates": {
            "startDate": "2023-07-13T00:00:00.000Z",
            "users": {
                "id": 1,
                "firstName": "John",
                "lastName": "Doe",
                "email": "JohnDoe@Gmail.com",
                "balance": 0
            }
        }
    }
}]

test("get tickets", async () => {
    prismaAsAny.game_user_game_ticket = {
      findMany: jest.fn().mockResolvedValueOnce(testTicketData),
    };
    const result = await TicketService.getAll();
    expect(prisma.game_user_game_ticket.findMany).toHaveBeenCalledTimes(1);
    expect(result).toEqual(testTicketResponse);
  });
})






describe('ticketsByGameId', () => {

    let testTicketData = [
        {
            "id": 1,
            "ticket_code": "123456",
            "total_reward_value": 0,
            "ticket_status": {
                "id": 3,
                "name": "pending"
            },
            "games": {
                "id": 1,
                "treasury": 0,
                "game_types": {
                    "id": 1,
                    "name": "euro millions",
                    "draw_date": "2023-08-18T00:00:00.000Z",
                    "reward": 43000000,
                    "image": "euromillions.png",
                    "ticket_cost": 2.5
                },
                "user_syndicates": {
                    "start_date": "2023-07-13T00:00:00.000Z",
                    "users": {
                        "id": 1,
                        "first_name": "John",
                        "last_name": "Doe",
                        "email": "JohnDoe@Gmail.com",
                        "balance": 0
                    }
                }
            }
        }
    ]
    
    const testTicketResponse = [{
        "id": 1,
        "ticketCode": "123456",
        "totalRewardValue": 0,
        "ticketStatus": {
            "id": 3,
            "name": "pending"
        },
        "games": {
            "id": 1,
            "treasury": 0,
            "gameTypes": {
                "id": 1,
                "name": "euro millions",
                "drawDate": "2023-08-18T00:00:00.000Z",
                "reward": 43000000,
                "image": "euromillions.png",
                "ticketCost": 2.5
            },
            "userSyndicates": {
                "startDate": "2023-07-13T00:00:00.000Z",
                "users": {
                    "id": 1,
                    "firstName": "John",
                    "lastName": "Doe",
                    "email": "JohnDoe@Gmail.com",
                    "balance": 0
                }
            }
        }
    }]
    
    test("get tickets byGame ID", async () => {
        prismaAsAny.game_user_game_ticket = {
          findMany: jest.fn().mockResolvedValueOnce(testTicketData),
        };
        const result = await TicketService.ticketsByGameId(1);
        expect(prisma.game_user_game_ticket.findMany).toHaveBeenCalledTimes(1);
        expect(result).toEqual(testTicketResponse);
      });
    })



    describe("PUT /update/:ticketId", () => { 

        const exampleTicketUpdate= {
         ticket_status_id: 1,
            total_reward_value: 5
        };
          it("should get update user by id", async () => {
            prismaAsAny.game_user_game_ticket = {
              update: jest.fn().mockReturnValueOnce(exampleTicketUpdate),
            };
      
            const result = await TicketService.updateTickets(exampleTicketUpdate);
            expect(prisma.game_user_game_ticket.update).toHaveBeenCalledTimes(1);
            expect(result).toEqual(exampleTicketUpdate);
          });
        });


        describe('delete tickets by id', () => {


            it('should delete the ticket by ID', async () => {
                prismaAsAny.game_user_game_ticket = {
                    delete: jest.fn()
                }
           
          
              
              const result = await TicketService.deleteTicketsById(1);
          
              
              expect(prisma.game_user_game_ticket.delete).toHaveBeenCalledTimes(1);
          
            });
          });  