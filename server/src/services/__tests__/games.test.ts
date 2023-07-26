import { IGames, IMessages } from '../../interfaces';
import { prismaAsAny } from '../../test-utils/prisma';
import { prisma } from '../../utils/prisma';
import { GameService } from '../games';
import { MessageService } from '../messages';
import { ReviewsService } from '../reviews';
import { UserService } from '../users';

const testGames: IGames[] = [{

        name: "string",
        draw_date: new Date(),
        reward: 22222,
        required_ticket_number: "2",
        user_syndicates: {
          start_date: new Date(),
          users: {
            id: 2,
            first_name: "string",
            last_name:" string",
            email: "string@string11",
          },
          syndicates: {
            id: 1,
            created_date: new Date(),
            name: "Thomas",
            description: "qewef quqoudbqeib",
            avatar: "Thoomas203.png",
         
        }
      }
    
}]

const createGames = {
    name: "Thoams",
    draw_date: new Date(),
    reward: 2030,
    required_ticket_number: 2,
    user_syndicate_id: 1,
}
//updating games
const updateGames = {
    name: "update",
    draw_date: new Date(),
    reward: 12234,
    required_ticket_number: 2,
    user_syndicate_id: 1
}
/**
 * get all messages
 */
describe("GET /games", () => {
    test("get all games", async () => {
      prismaAsAny.games = {
        findMany: jest.fn().mockResolvedValueOnce(testGames),
      };
      const result = await GameService.getAll();
      expect(prisma.games.findMany).toHaveBeenCalledTimes(1);
      expect(result).toEqual(testGames);
    });

  });
/**
 * create game
 */
  describe("/POST /createGames", () => {
 
    it("should create a new game", async () => {
      prismaAsAny.games = { 
        create: jest.fn().mockResolvedValueOnce(createGames),
    };
     console.log(createGames);
  const result = await GameService.createGameInSyndicate(createGames);
  console.log("hi"+result)
  expect(prisma.games.create).toHaveBeenCalledTimes(1);
  expect(result).toEqual(createGames.draw_date);
      
    });
  
  
  });
/**
 * updating games
 */

  describe("PUT /games/:id", () => {
    it("should get update syndicate by id", async () => {
      prismaAsAny.games = {
        update: jest.fn().mockReturnValueOnce(updateGames),
      };

      const result = await GameService.updateGames(updateGames);
      expect(prisma.games.update).toHaveBeenCalledTimes(1);
      expect(result).toEqual(updateGames);
    });
  });