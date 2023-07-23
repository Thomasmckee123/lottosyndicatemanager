import { IReviews } from '../../interfaces';
import { IUserSyndicate } from '../../interfaces/syndicates';
import { prismaAsAny } from '../../test-utils/prisma';
import { prisma } from '../../utils/prisma';
import { BoardsService } from '../boards';
import { SyndicateService } from '../syndicates';
const practiceBoards = [{
id: 1,
name: "new board",
syndicates: {
  id: 1,
  name: "Thomas",
}}]
const practiceBoardsBySyndicateId = [{
    id: 1,
    name: "new board",
    syndicates: {
      id: 1,
      name: "Thomas",
    }}]
    const practiceCreateBoardsBySyndicateId = {
        id: 1,
        name: "new board",
        syndicates: {
          id: 1,
          name: "Thomas",
        }}
const updateBoards = {
    name: "board1"
}

const testdeleteBoard  = {
    id : 2,
}
const deleteManyBoard ={
    board_id: 2
}
/**
 * get all boards
 */
describe("GET /boards", () => {
    test("get all boards", async () => {
      prismaAsAny.boards= {
        findMany: jest.fn().mockResolvedValueOnce(practiceBoards),
      };
      const result = await BoardsService.getAll();
      expect(prisma.boards.findMany).toHaveBeenCalledTimes(1);
      expect(result).toEqual(practiceBoards);
    });

  });
/**
 * get boards by id
 */
describe("/GET/MessagesByBoardById", () => {
    it("should return all the messages with their board id", async () => {
      prismaAsAny.boards = {
        findMany: jest.fn().mockReturnValueOnce(practiceBoardsBySyndicateId),
      };
      const result = await BoardsService.getBoardsBySyndicateId(1);
   
     
      expect(prisma.boards.findMany).toHaveBeenCalledTimes(1);
      
      if(result){
      expect(result).toEqual(practiceBoardsBySyndicateId);
    }
    });
  });



  /**
 * create Board
 */
  describe("/POST /createBoards", () => {
 
    it("should create a new board", async () => {
      prismaAsAny.boards = { 
        create: jest.fn().mockResolvedValueOnce(practiceCreateBoardsBySyndicateId),
    };
    
  const result = await BoardsService.createBoards(practiceCreateBoardsBySyndicateId);
  console.log("hi"+result)
  expect(prisma.boards.create).toHaveBeenCalledTimes(1);
  expect(result).toEqual(practiceCreateBoardsBySyndicateId.name);
      
    });
  
  
  });

  /**
   * doing update boards
   */
describe("PUT /syndicates/:id", () => {
    it("should get update syndicate by id", async () => {
      prismaAsAny.boards = {
        update: jest.fn().mockReturnValueOnce(updateBoards),
      };

      const result = await BoardsService.updateBoards(updateBoards);
      expect(prisma.boards.update).toHaveBeenCalledTimes(1);
      expect(result).toEqual(updateBoards);
    });
  });

  

      /**
       * deleting a boards
       */
      describe('deleteBoardsById', () => {
        it('should delete the boards by ID', async () => {
            prismaAsAny.board_message = {
                deleteMany: jest.fn().mockResolvedValueOnce({ deleteManyBoard}),
              };
            prismaAsAny.boards = {
                delete: jest.fn().mockResolvedValueOnce(testdeleteBoard)
            }
            
          
      
          
          const result = await BoardsService.deleteBoardsById(testdeleteBoard);
      
          
          expect(prisma.boards.delete).toHaveBeenCalledTimes(1);
      
          expect(result).toEqual(testdeleteBoard);
        });
      });