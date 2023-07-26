import { IMessages } from '../../interfaces';
import { prismaAsAny } from '../../test-utils/prisma';
import { prisma } from '../../utils/prisma';
import { MessageService } from '../messages';
import { ReviewsService } from '../reviews';
import { UserService } from '../users';

const testMessages = [{
id: 1,
message: "hiiiiiii",
created_date: new Date(),
boards:{
  
        id: 1, 
        name: "string"

    },
user_syndicates:{
    id: 1,
    users:{
    id: 1,
    first_name: "string",
    last_name:"string",
    },
},}]

const messagesByBoardId : IMessages[] = [{
    id: 1,
message: "hiiiiiii",
created_date: new Date(),
boards:{
  
        id: 1, 
        name: "string"

    },
user_syndicates:{
    id: 1,
    users:{
    id: 1,
    first_name: "string",
    last_name:"string",
    },
}}]

const testCreateMessage = {
    message: "message.message",
    created_date: new Date(),
    board_id : 1,
    user_syndicate_id: 1

}
const testDeleteMessage = {
    message: "deleted",
    created_date: new Date(),
}
/**
 * get all messages
 */
describe("GET /messages", () => {
    test("get all users", async () => {
      prismaAsAny.board_message = {
        findMany: jest.fn().mockResolvedValueOnce(testMessages),
      };
      const result = await MessageService.getAll();
      expect(prisma.board_message.findMany).toHaveBeenCalledTimes(1);
      expect(result).toEqual(testMessages);
    });

  });
  /**
   * get messages by board Id
   */

  describe("/GET/MessagesByBoardById", () => {
    it("should return all the messages with their board id", async () => {
      prismaAsAny.board_message = {
        findMany: jest.fn().mockReturnValueOnce(messagesByBoardId),
      };
      const result = await MessageService.getMessagesByBoardsId(1);
   
     
      expect(prisma.board_message.findMany).toHaveBeenCalledTimes(1);
      
      if(result){
      expect(result).toEqual(messagesByBoardId);
    }
    });
  });

  /**
   * create messages in board
   * 
   */
  describe("/POST /createMessage", () => {
 
    it("should create a new syndicate", async () => {
      prismaAsAny.board_message = { 
        create: jest.fn().mockResolvedValueOnce(testCreateMessage),
    };
     console.log(testCreateMessage);
  const result = await MessageService.createMessageInBoard(testCreateMessage);
  console.log("hi"+result)
  expect(prisma.board_message.create).toHaveBeenCalledTimes(1);
  expect(result).toEqual(testCreateMessage.created_date);
      
    });
  
  
  });


//deleting a message
  describe("PUT /messages/delete/:id", () => {
    it("should get delete syndicate by id", async () => {
      prismaAsAny.board_message = {
        update: jest.fn().mockReturnValueOnce(testDeleteMessage),
      };

      const result = await MessageService.deleteMessageById(1);
      expect(prisma.board_message.update).toHaveBeenCalledTimes(1);
      expect(result).toEqual(testDeleteMessage);
    });
  });

