import { prismaAsAny } from '../../test-utils/prisma';
import { prisma } from '../../utils/prisma';
import UserGameService from '../userGames';

jest.mock("@prisma/client");  



describe("GET /userGames", () => {
 let testUserGames= [
        {
            "id": 1,
            "start_date": "2023-07-21T00:00:00.000Z",
            "deposit": 0,
            "role_id": 3,
            "user_id": 1,
            "games": {
                "id": 1,
                "maximum_players": 5,
                "treasury": 0,
                "game_types": {
                    "id": 1,
                    "name": "euro millions"
                },
                "user_syndicates": {
                    "start_date": "2023-07-13T00:00:00.000Z",
                    "users": {
                        "id": 1,
                        "first_name": "John",
                        "last_name": "Doe",
                        "email": "JohnDoe@Gmail.com",
                        "balance": 0
                    },
                    "syndicates": {
                        "id": 1,
                        "created_date": "2023-07-10T00:00:00.000Z",
                        "name": "The Thunderbolts",
                        "description": "For those who strike like lightning!",
                        "avatar": "thunderbolts.jpg"
                    }
                }
            }
        }
    ]
  let testUserGameResponse = [
    {
        "id": 1,
        "startDate": "2023-07-21T00:00:00.000Z",
        "deposit": 0,
        "roleId": 3,
        "userId": 1,
        "games": {
            "id": 1,
            "maximumPlayers": 5,
            "treasury": 0,
            "gameTypes": {
                "id": 1,
                "name": "euro millions"
            },
            "userSyndicates": {
                "startDate": "2023-07-13T00:00:00.000Z",
                "users": {
                    "id": 1,
                    "firstName": "John",
                    "lastName": "Doe",
                    "email": "JohnDoe@Gmail.com",
                    "balance": 0
                },
                "syndicates": {
                    "id": 1,
                    "createdDate": "2023-07-10T00:00:00.000Z",
                    "name": "The Thunderbolts",
                    "description": "For those who strike like lightning!",
                    "avatar": "thunderbolts.jpg"
                }
            }
        }
    }
]
       
        test("get User games", async () => {
          prismaAsAny.user_games = {
            findMany: jest.fn().mockResolvedValueOnce(testUserGames),
          };
          const result = await UserGameService.getAll();
          expect(prisma.user_games.findMany).toHaveBeenCalledTimes(1);
          expect(result).toEqual(testUserGameResponse);
        });
  
      });





      describe("GET /userGames/syndicates/:syndicateId", () => {
        let testUserGames= [
               {
                   "id": 1,
                   "start_date": "2023-07-21T00:00:00.000Z",
                   "deposit": 0,
                   "role_id": 3,
                   "user_id": 1,
                   "games": {
                       "id": 1,
                       "maximum_players": 5,
                       "treasury": 0,
                       "game_types": {
                           "id": 1,
                           "name": "euro millions"
                       },
                
                           "syndicates": {
                               "id": 1,
                               "created_date": "2023-07-10T00:00:00.000Z",
                               "name": "The Thunderbolts",
                               "description": "For those who strike like lightning!",
                               "avatar": "thunderbolts.jpg"
                           }
                       }
                   }
               
           ]
         let testUserGameResponse =         [ {
            "id": 1,
            "start_date": "2023-07-21T00:00:00.000Z",
            "deposit": 0,
            "role_id": 3,
            "user_id": 1,
            "games": {
                "id": 1,
                "maximum_players": 5,
                "treasury": 0,
                "game_types": {
                    "id": 1,
                    "name": "euro millions"
                },
         
                    "syndicates": {
                        "id": 1,
                        "created_date": "2023-07-10T00:00:00.000Z",
                        "name": "The Thunderbolts",
                        "description": "For those who strike like lightning!",
                        "avatar": "thunderbolts.jpg"
                    }
                
            }
        }
    ]
              
               test("get User games by syndicate id", async () => {
                 prismaAsAny.user_games = {
                   findMany: jest.fn().mockResolvedValueOnce(testUserGames),
                 };
                 const result = await UserGameService.getGamesBySyndicateId(1);
                 expect(prisma.user_games.findMany).toHaveBeenCalledTimes(1);
                 expect(result).toEqual(testUserGameResponse);
               });
         
             });
       
       
       



             describe("GET /userGames/users/:userId", () => {
                let testUserGames= [
                       {
                           "id": 1,
                           "start_date": "2023-07-21T00:00:00.000Z",
                           "deposit": 0,
                           "role_id": 3,
                           "user_id": 1,
                           "games": {
                               "id": 1,
                               "maximum_players": 5,
                               "treasury": 0,
                               "game_types": {
                                   "id": 1,
                                   "name": "euro millions"
                               },
                        
                                   "syndicates": {
                                       "id": 1,
                                       "created_date": "2023-07-10T00:00:00.000Z",
                                       "name": "The Thunderbolts",
                                       "description": "For those who strike like lightning!",
                                       "avatar": "thunderbolts.jpg"
                                   }
                               
                           }
                       }
                   ]
                 let testUserGameResponse = [
                   {
                       "id": 1,
                       "startDate": "2023-07-21T00:00:00.000Z",
                       "deposit": 0,
                       "roleId": 3,
                       "userId": 1,
                       "games": {
                           "id": 1,
                           "maximumPlayers": 5,
                           "treasury": 0,
                           "gameTypes": {
                               "id": 1,
                               "name": "euro millions"
                           },
                      
                               "syndicates": {
                                   "id": 1,
                                   "createdDate": "2023-07-10T00:00:00.000Z",
                                   "name": "The Thunderbolts",
                                   "description": "For those who strike like lightning!",
                                   "avatar": "thunderbolts.jpg"
                               }
                           
                       }
                   }
               ]
                      
                       test("get User games by user id", async () => {
                         prismaAsAny.user_games = {
                           findMany: jest.fn().mockResolvedValueOnce(testUserGames),
                         };
                         const result = await UserGameService.getGamesByUserId(1);
                         expect(prisma.user_games.findMany).toHaveBeenCalledTimes(1);
                         expect(result).toEqual(testUserGameResponse);
                       });
                 
                     });
               
                     describe("GET /userGames/games/:gameId", () => {
                        let testUserGames= [
                               {
                                   "id": 1,
                                   "start_date": "2023-07-21T00:00:00.000Z",
                                   "deposit": 0,
                                   "role_id": 3,
                                   "user_id": 1,
                                   "games": {
                                       "id": 1,
                                       "maximum_players": 5,
                                       "treasury": 0,
                                       "game_types": {
                                           "id": 1,
                                           "name": "euro millions",
                                       },
                                    
                                           "syndicates": {
                                               "id": 1,
                                               "created_date": "2023-07-10T00:00:00.000Z",
                                               "name": "The Thunderbolts",
                                               "description": "For those who strike like lightning!",
                                               "avatar": "thunderbolts.jpg"
                                           }
                                       }
                                   
                               }
                           ]
                         let testUserGameResponse = [
                           {
                               "id": 1,
                               "startDate": "2023-07-21T00:00:00.000Z",
                               "deposit": 0,
                               "roleId": 3,
                               "userId": 1,
                               "games": {
                                   "id": 1,
                                   "maximumPlayers": 5,
                                   "treasury": 0,
                                   "gameTypes": {
                                       "id": 1,
                                       "name": "euro millions",
                                   },
                                
                                       "syndicates": {
                                           "id": 1,
                                           "createdDate": "2023-07-10T00:00:00.000Z",
                                           "name": "The Thunderbolts",
                                           "description": "For those who strike like lightning!",
                                           "avatar": "thunderbolts.jpg"
                                       }
                                   
                               }
                           }
                       ]
                              
                               test("get User games by game id", async () => {
                                 prismaAsAny.user_games = {
                                   findMany: jest.fn().mockResolvedValueOnce(testUserGames),
                                 };
                                 const result = await UserGameService.getGamesByGameId(1);
                                 expect(prisma.user_games.findMany).toHaveBeenCalledTimes(1);
                                 expect(result).toEqual(testUserGameResponse);
                               });
                         
                             });
                       
                        


                             describe("/POST userGames/createUserGame/games/:gameId/users/:userId", () => {
                                const testCreateUserGame = {
                                    "start_date": "2023-07-21T0s0:00:00.000Z",
                                    "deposit": 20,
                                    "game_id":1 ,
                                    "role_id": 1,
                                    "user_id": 1,
                                  };
                              
                                 
                              
                               
                               
                              
                                          it("should create a new user Syndicate", async () => {
                                            prismaAsAny.user_games = { 
                                              create: jest.fn().mockResolvedValueOnce(testCreateUserGame),
                                          };
                                        const result = await UserGameService.createUserGame(testCreateUserGame);
                                        console.log("hi"+result)
                                        expect(prisma.user_games.create).toHaveBeenCalledTimes(1);
                                        expect(result).toEqual(testCreateUserGame.start_date);
                                            
                                          });
                                        
                                        
                                        });