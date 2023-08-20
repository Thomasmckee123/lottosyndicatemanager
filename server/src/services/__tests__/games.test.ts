import { Result } from "express-validator";
import { IGames } from "../../interfaces";
import { prismaAsAny } from '../../test-utils/prisma';
import { prisma } from '../../utils/prisma';
import { GameTypeService } from '../gameTypes';
import { GameService } from "../games";
import { UserService } from "../users";
import { SyndicateService } from "../syndicates";
    describe("GET /games", () => {



        const games :any[]= [
            {    "id": 1,
                "maximum_players": 5,
                "treasury": 0,
                "game_types": {
                    "id": 1,
                    "name": "euro millions",
                    "draw_date": new Date("2023-08-18T00:00:00.000Z"),
                    "reward": 43000000,
                    "image": "euromillions.png",
                    "ticket_cost": 2.5
                },
                "user_syndicates": {
                    "start_date": new Date("2023-07-13T00:00:00.000Z"),
                    "users": {
                        "id": 1,
                        "first_name": "John",
                        "last_name": "Doe",
                        "email": "JohnDoe@Gmail.com",
                        "balance": 0
                    },
                    "syndicates": {
                        "id": 1,
                        "created_date": new Date("2023-07-10T00:00:00.000Z"),
                        "name": "The Thunderbolts",
                        "description": "For those who strike like lightning!",
                        "avatar": "thunderbolts.jpg"
                    }
                }
            },]
    
      const gamesResponse :IGames[]= [
        {
            "id": 1,
            "maximumPlayers": games[0].maximum_players,
            "treasury": 0,
            "gameTypes": {
                "id": 1,
                "name": "euro millions",
                "drawDate": new Date("2023-08-18T00:00:00.000Z"),
                "reward": 43000000,
                "image": "euromillions.png",
                "ticketCost": 2.5
            },
            "userSyndicates": {
                "startDate": new Date("2023-07-13T00:00:00.000Z"),
                "users": {
                    "id": 1,
                    "firstName": "John",
                    "lastName": "Doe",
                    "email": "JohnDoe@Gmail.com",
                    "balance":0
                },
                "syndicates": {
                    "id": 1,
                    "createdDate": new Date("2023-07-10T00:00:00.000Z"),
                    "name": "The Thunderbolts",
                    "description": "For those who strike like lightning!",
                    "avatar": "thunderbolts.jpg"
                }
            }
        },]
      
           
        test("get gameResponse", async () => {
            prismaAsAny.games = {
                findMany: jest.fn().mockResolvedValueOnce(games),
            };
            const result = await GameService.getAll();
            expect(prisma.games.findMany).toHaveBeenCalledTimes(1);
            expect(result).toEqual(gamesResponse);
        });
    });

    describe("GET /games/:id", () => {



        const games :any= 
            {    "id": 1,
                "maximum_players": 5,
                "treasury": 0,
                "game_types": {
                    "id": 1,
                    "name": "euro millions",
                    "draw_date": new Date("2023-08-18T00:00:00.000Z"),
                    "reward": 43000000,
                    "image": "euromillions.png",
                    "ticket_cost": 2.5
                },
                "user_syndicates": {
                    "start_date": new Date("2023-07-13T00:00:00.000Z"),
                    "users": {
                        "id": 1,
                        "first_name": "John",
                        "last_name": "Doe",
                        "email": "JohnDoe@Gmail.com",
                        "balance": 0
                    },
                    "syndicates": {
                        "id": 1,
                        "created_date": new Date("2023-07-10T00:00:00.000Z"),
                        "name": "The Thunderbolts",
                        "description": "For those who strike like lightning!",
                        "avatar": "thunderbolts.jpg"
                    }
                }
            }
    
      const gamesResponse :IGames= 
        {
            "id": 1,
            "maximumPlayers": 5,
            "treasury": 0,
            "gameTypes": {
                "id": 1,
                "name": "euro millions",
                "drawDate": new Date("2023-08-18T00:00:00.000Z"),
                "reward": 43000000,
                "image": "euromillions.png",
                "ticketCost": 2.5
            },
            "userSyndicates": {
                "startDate": new Date("2023-07-13T00:00:00.000Z"),
                "users": {
                    "id": 1,
                    "firstName": "John",
                    "lastName": "Doe",
                    "email": "JohnDoe@Gmail.com",
                    "balance":0
                },
                "syndicates": {
                    "id": 1,
                    "createdDate": new Date("2023-07-10T00:00:00.000Z"),
                    "name": "The Thunderbolts",
                    "description": "For those who strike like lightning!",
                    "avatar": "thunderbolts.jpg"
                }
            }
        }
      
           
        test("get gameResponse", async () => {
            prismaAsAny.games = {
                findUnique: jest.fn().mockResolvedValueOnce(games),
            };
            const result = await GameService.getGamesByGameId(1);
            expect(prisma.games.findUnique).toHaveBeenCalledTimes(1);
            expect(result).toEqual(gamesResponse);
        });
    });




    describe("GET /games/:syndicateId", () => {



        const games :any[]= [
            {    "id": 1,
                "maximum_players": 5,
                "treasury": 0,
                "game_types": {
                    "id": 1,
                    "name": "euro millions",
                    "draw_date": new Date("2023-08-18T00:00:00.000Z"),
                    "reward": 43000000,
                    "image": "euromillions.png",
                    "ticket_cost": 2.5
                },
                "user_syndicates": {
                    "start_date": new Date("2023-07-13T00:00:00.000Z"),
                    "users": {
                        "id": 1,
                        "first_name": "John",
                        "last_name": "Doe",
                        "email": "JohnDoe@Gmail.com",
                        "balance": 0
                    },
                    "syndicates": {
                        "id": 1,
                        "created_date": new Date("2023-07-10T00:00:00.000Z"),
                        "name": "The Thunderbolts",
                        "description": "For those who strike like lightning!",
                        "avatar": "thunderbolts.jpg"
                    }
                }
            },]
    
      const gamesResponse :IGames[]= [
        {
            "id": 1,
            "maximumPlayers": games[0].maximum_players,
            "treasury": 0,
            "gameTypes": {
                "id": 1,
                "name": "euro millions",
                "drawDate": new Date("2023-08-18T00:00:00.000Z"),
                "reward": 43000000,
                "image": "euromillions.png",
                "ticketCost": 2.5
            },
            "userSyndicates": {
                "startDate": new Date("2023-07-13T00:00:00.000Z"),
                "users": {
                    "id": 1,
                    "firstName": "John",
                    "lastName": "Doe",
                    "email": "JohnDoe@Gmail.com",
                    "balance":0
                },
                "syndicates": {
                    "id": 1,
                    "createdDate": new Date("2023-07-10T00:00:00.000Z"),
                    "name": "The Thunderbolts",
                    "description": "For those who strike like lightning!",
                    "avatar": "thunderbolts.jpg"
                }
            }
        },]
      
           
        test("get games by syndicate id", async () => {
            prismaAsAny.games = {
                findMany: jest.fn().mockResolvedValueOnce(games),
            };
            const result = await GameService.getGamesBySyndicateId(1);
            expect(prisma.games.findMany).toHaveBeenCalledTimes(1);
            expect(result).toEqual(gamesResponse);
        });
    });


    describe("GET /games/:typeId", () => {



        const games :any[]= [
            {    "id": 1,
                "maximum_players": 5,
                "treasury": 0,
                "game_types": {
                    "id": 1,
                    "name": "euro millions",
                    "draw_date": new Date("2023-08-18T00:00:00.000Z"),
                    "reward": 43000000,
                    "image": "euromillions.png",
                    "ticket_cost": 2.5
                },
                "user_syndicates": {
                    "start_date": new Date("2023-07-13T00:00:00.000Z"),
                    "users": {
                        "id": 1,
                        "first_name": "John",
                        "last_name": "Doe",
                        "email": "JohnDoe@Gmail.com",
                        "balance": 0
                    },
                    "syndicates": {
                        "id": 1,
                        "created_date": new Date("2023-07-10T00:00:00.000Z"),
                        "name": "The Thunderbolts",
                        "description": "For those who strike like lightning!",
                        "avatar": "thunderbolts.jpg"
                    }
                }
            },]
    
      const gamesResponse :IGames[]= [
        {
            "id": 1,
            "maximumPlayers": games[0].maximum_players,
            "treasury": 0,
            "gameTypes": {
                "id": 1,
                "name": "euro millions",
                "drawDate": new Date("2023-08-18T00:00:00.000Z"),
                "reward": 43000000,
                "image": "euromillions.png",
                "ticketCost": 2.5
            },
            "userSyndicates": {
                "startDate": new Date("2023-07-13T00:00:00.000Z"),
                "users": {
                    "id": 1,
                    "firstName": "John",
                    "lastName": "Doe",
                    "email": "JohnDoe@Gmail.com",
                    "balance":0
                },
                "syndicates": {
                    "id": 1,
                    "createdDate": new Date("2023-07-10T00:00:00.000Z"),
                    "name": "The Thunderbolts",
                    "description": "For those who strike like lightning!",
                    "avatar": "thunderbolts.jpg"
                }
            }
        },]
      
           
        test("get games by syndicate and type id", async () => {
            prismaAsAny.games = {
                findMany: jest.fn().mockResolvedValueOnce(games),
            };
            const result = await GameService.getGamesByTypeId(1, 1);
            expect(prisma.games.findMany).toHaveBeenCalledTimes(1);
            expect(result).toEqual(gamesResponse);
        });
    });


    describe("GET /games/archived", () => {



        const games :any[]= [
            {    "id": 1,
                "maximum_players": 5,
                "treasury": 0,
                "game_types": {
                    "id": 1,
                    "name": "euro millions",
                    "draw_date": new Date("2023-08-18T00:00:00.000Z"),
                    "reward": 43000000,
                    "image": "euromillions.png",
                    "ticket_cost": 2.5
                },
                "user_syndicates": {
                    "start_date": new Date("2023-07-13T00:00:00.000Z"),
                    "users": {
                        "id": 1,
                        "first_name": "John",
                        "last_name": "Doe",
                        "email": "JohnDoe@Gmail.com",
                        "balance": 0
                    },
                    "syndicates": {
                        "id": 1,
                        "created_date": new Date("2023-07-10T00:00:00.000Z"),
                        "name": "The Thunderbolts",
                        "description": "For those who strike like lightning!",
                        "avatar": "thunderbolts.jpg"
                    }
                }
            },]
    
      const gamesResponse :IGames[]= [
        {
            "id": 1,
            "maximumPlayers": games[0].maximum_players,
            "treasury": 0,
            "gameTypes": {
                "id": 1,
                "name": "euro millions",
                "drawDate": new Date("2023-08-18T00:00:00.000Z"),
                "reward": 43000000,
                "image": "euromillions.png",
                "ticketCost": 2.5
            },
            "userSyndicates": {
                "startDate": new Date("2023-07-13T00:00:00.000Z"),
                "users": {
                    "id": 1,
                    "firstName": "John",
                    "lastName": "Doe",
                    "email": "JohnDoe@Gmail.com",
                    "balance":0
                },
                "syndicates": {
                    "id": 1,
                    "createdDate": new Date("2023-07-10T00:00:00.000Z"),
                    "name": "The Thunderbolts",
                    "description": "For those who strike like lightning!",
                    "avatar": "thunderbolts.jpg"
                }
            }
        },]
      
           
        test("get games by syndicate and type id", async () => {
            prismaAsAny.games = {
                findMany: jest.fn().mockResolvedValueOnce(games),
            };
            const result = await GameService.archivedGames(1);
            expect(prisma.games.findMany).toHaveBeenCalledTimes(1);
            expect(result).toEqual(gamesResponse);
        });
    });


    describe("PUT /update/:gameId", () => { 

        const balanceChange= {
        treasury: 0,
        };
          it("should get update user by id", async () => {
            prismaAsAny.games = {
              update: jest.fn().mockReturnValueOnce(balanceChange),
            };
      
            const result = await GameService.updateGames(balanceChange);
            expect(prisma.games.update).toHaveBeenCalledTimes(1);
            expect(result).toEqual(balanceChange);
          });
        });



        describe("/POST /game", () => {
            const testCreateGame = {
                maximumPlayers: 1,
                treasury: 0,
                userSyndicateId: 1,
                gameTypeId: 1,
             
             
             }
            it("should create a new game", async () => {
              prismaAsAny.games = { 
                create: jest.fn().mockResolvedValueOnce(testCreateGame),
            };
             console.log(testCreateGame);
          const result = await GameService.createGameInSyndicate(testCreateGame);
          console.log("hi"+result)
          expect(prisma.games.create).toHaveBeenCalledTimes(1);
          expect(result).toEqual(testCreateGame);
              
            });
          
          
          });
    
          
    
    describe("/update/archive",()=>{
        const updatedResponse = {
"maximumPlayers": 0
        }
        
        test("archive game", async () => {
            prismaAsAny.games = {
                update: jest.fn().mockResolvedValueOnce(updatedResponse),
            };
            const result = await GameService.archiveGames(updatedResponse);
            expect(prisma.games.update).toHaveBeenCalledTimes(1);
            expect(result.maximumPlayers).toEqual(updatedResponse.maximumPlayers);
        });
        
        
        
        })