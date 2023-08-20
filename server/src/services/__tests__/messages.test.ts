
import { IMessages } from '../../interfaces';
import { prismaAsAny } from '../../test-utils/prisma';
import { prisma } from '../../utils/prisma';
import { MessageService } from '../messages';
import { ReviewsService } from '../reviews';

    describe("GET /messages", () => {



        const testMessage :any[]= [
            {
                "id": 1,
                "message": "Lets win this, Thunderbolts!",
                "created_date": new Date("2023-07-22T00:00:00.000Z"),
                "boards": {
                    "id": 1,
                    "name": "Thunderbolts Talk"
                },
                "user_games": {
                    "id": 1,
                    "deposit": 0,
                    "users": {
                        "id": 1,
                        "first_name": "John",
                        "last_name": "Doe"
                    }
                }
            }]
      const testMessageResponse :IMessages[]= [
        {
            "id": 1,
            "message": "Lets win this, Thunderbolts!",
            "createdDate": new Date("2023-07-22T00:00:00.000Z"),
            "boards": {
                "id": 1,
                "name": "Thunderbolts Talk"
            },
            "userGames": {
                "id": 1,
                "deposit": 0,
                "users": {
                    "id": 1,
                    "firstName": "John",
                    "lastName": "Doe"
                }
            }
        }]
        
      
           
        test("get Messages", async () => {
            prismaAsAny.board_message = {
                findMany: jest.fn().mockResolvedValueOnce(testMessage),
            };
            const result = await MessageService.getAll();
            expect(prisma.board_message.findMany).toHaveBeenCalledTimes(1);
            expect(result).toEqual(testMessageResponse);
        });
    });

    //a test for messages by board id
    describe("GET /messages/:boardId", () => {
        const testMessage :any[]= [
            {
                "id": 1,
                "message": "Lets win this, Thunderbolts!",
                "created_date": new Date("2023-07-22T00:00:00.000Z"),
                "boards": {
                    "id": 1,
                    "name": "Thunderbolts Talk"
                },
                "user_games": {
                    "id": 1,
                    "deposit": 0,
                    "users": {
                        "id": 1,
                        "first_name": "John",
                        "last_name": "Doe"
                    }
                }
            }]
      const testMessageResponse :IMessages[]= [
        {
            "id": 1,
            "message": "Lets win this, Thunderbolts!",
            "createdDate": new Date("2023-07-22T00:00:00.000Z"),
            "boards": {
                "id": 1,
                "name": "Thunderbolts Talk"
            },
            "userGames": {
                "id": 1,
                "deposit": 0,
                "users": {
                    "id": 1,
                    "firstName": "John",
                    "lastName": "Doe"
                }
            }
        }]
        
      
           
        test("get Messages by board id", async () => {
            prismaAsAny.board_message = {
                findMany: jest.fn().mockResolvedValueOnce(testMessage),
            };
            const result = await MessageService.getMessagesByBoardsId(1);
            expect(prisma.board_message.findMany).toHaveBeenCalledTimes(1);
            expect(result).toEqual(testMessageResponse);
        });
    }
    );


    describe("/POST /createMessage", () => {
        const testCreateMessage = {
            message: "Lets win this, Thunderbolts!",
   created_date: new Date("2023-07-22T00:00:00.000Z"),
   board_id: 1,
   user_game_id: 1,
         
         
         
         }
        it("should create a new review", async () => {
          prismaAsAny.user_syndicate_reviews = { 
            create: jest.fn().mockResolvedValueOnce(testCreateMessage),
        };
        
      const result = await ReviewsService.createReviewInSyndicate(testCreateMessage);
      console.log("hi"+result)
      expect(prisma.user_syndicate_reviews.create).toHaveBeenCalledTimes(1);
      expect(result).toEqual(testCreateMessage.created_date);
          
        });
      
      
      });



      describe("/put/deleteMessage", () => {
        const testDeleteMessage = {
            message: "deleted",
            createdDate: new Date("2023-07-22T00:00:00.000Z"),
        }

        it("should delete a message", async () => {
prismaAsAny.board_message = {
    update: jest.fn().mockResolvedValueOnce(testDeleteMessage),
};
const result = await MessageService.deleteMessageById(1);
expect(prisma.board_message.update).toHaveBeenCalledTimes(1);
expect(result).toEqual(testDeleteMessage);
        }
        );
    }
    );