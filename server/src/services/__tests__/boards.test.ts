
import { prismaAsAny } from '../../test-utils/prisma';
import { prisma } from '../../utils/prisma';
import { BoardsService } from '../boards';

import { GameService } from "../games";


    describe("GET /boards/:id", () => {



        const testBoards :any[]= [
    {
        "id": 1,
        "name": "Thunderbolts Talk",
        "games": {
            "id": 1,
            "user_games": [
                {
                    "id": 1,
                    "deposit": 0,
                    "users": {
                        "id": 1,
                        "first_name": "John",
                        "last_name": "Doe"
                    }
                }
            ]
        },
        "board_message": [
            {
                "id": 1,
                "message": "Lets win this, Thunderbolts!",
                "created_date": "2023-07-22T00:00:00.000Z",
                "board_id": 1,
                "user_game_id": 1
            }
        ]
    }]
    
      const testBoardsResponse :any[]= [
        {
            "id": 1,
            "name": "Thunderbolts Talk",
            "games": {
                "id": 1,
                "user_games": [
                    {
                        "id": 1,
                        "deposit": 0,
                        "users": {
                            "id": 1,
                            "first_name": "John",
                            "last_name": "Doe"
                        }
                    }
                ]
            },
            "board_message": [
                {
                    "id": 1,
                    "message": "Lets win this, Thunderbolts!",
                    "created_date": "2023-07-22T00:00:00.000Z",
                    "board_id": 1,
                    "user_game_id": 1
                }
            ]
        }]
           
        test("get gameResponse", async () => {
            prismaAsAny.boards = {
                findMany: jest.fn().mockResolvedValueOnce(testBoards),
            };
            const result = await BoardsService.getAll();
            expect(prisma.boards.findMany).toHaveBeenCalledTimes(1);
            expect(result).toEqual(testBoardsResponse);
        });
    });



    describe("GET /boards/:id", () => {



        const testBoards :any[]= [
    {
        "id": 1,
        "name": "Thunderbolts Talk",
        "games": {
            "id": 1,
            "user_games": [
                {
                    "id": 1,
                    "deposit": 0,
                    "users": {
                        "id": 1,
                        "first_name": "John",
                        "last_name": "Doe"
                    }
                }
            ]
        },
        "board_message": [
            {
                "id": 1,
                "message": "Lets win this, Thunderbolts!",
                "created_date": "2023-07-22T00:00:00.000Z",
                "board_id": 1,
                "user_game_id": 1
            }
        ]
    }]
    
      const testBoardsResponse :any[]= [
        {
            "id": 1,
            "name": "Thunderbolts Talk",
            "games": {
                "id": 1,
                "user_games": [
                    {
                        "id": 1,
                        "deposit": 0,
                        "users": {
                            "id": 1,
                            "first_name": "John",
                            "last_name": "Doe"
                        }
                    }
                ]
            },
            "board_message": [
                {
                    "id": 1,
                    "message": "Lets win this, Thunderbolts!",
                    "created_date": "2023-07-22T00:00:00.000Z",
                    "board_id": 1,
                    "user_game_id": 1
                }
            ]
        }]
           
        test("get gameResponse", async () => {
            prismaAsAny.boards = {
                findMany: jest.fn().mockResolvedValueOnce(testBoards),
            };
            const result = await BoardsService.getBoardsByGameId(1);
            expect(prisma.boards.findMany).toHaveBeenCalledTimes(1);
            expect(result).toEqual(testBoardsResponse);
        });
    });


    describe("/POST /createBoards", () => {
        const testCreateBoardData = {
            name: "board.name",
            game_id: 1,
         
         }
        it("should create a new review", async () => {
          prismaAsAny.boards = { 
            create: jest.fn().mockResolvedValueOnce(testCreateBoardData),
        };
      
      const result = await BoardsService.createBoards(testCreateBoardData);
      console.log("hi"+result)
      expect(prisma.boards.create).toHaveBeenCalledTimes(1);
      expect(result).toEqual(testCreateBoardData.name);
          
        });
      
      
      });

      describe("PUT /update/:boardId", () => { 

        const testNameChange= {
        name: "newname",
        };
          it("should get update the board by id", async () => {
            prismaAsAny.boards = {
              update: jest.fn().mockReturnValueOnce(testNameChange),
            };
      
            const result = await BoardsService.updateBoards(testNameChange);
            expect(prisma.boards.update).toHaveBeenCalledTimes(1);
            expect(result).toEqual(testNameChange);
          });
        });

        describe('DELETE/ deleteBoardById', () => {
            const deleteBoard = {
                id: 1 
              
            };
            it('should delete the review by ID', async () => {
                prismaAsAny.boards = {
                    delete: jest.fn().mockResolvedValueOnce(deleteBoard)
                }
           
          
              
              await BoardsService.deleteBoardsById(1);
          
              
              expect(prisma.boards.delete).toHaveBeenCalledTimes(1);
          
            });
          });
