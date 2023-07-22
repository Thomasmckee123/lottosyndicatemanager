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

  