
import { IUserSyndicate } from '../../interfaces';
import { prismaAsAny } from '../../test-utils/prisma';
import { prisma } from '../../utils/prisma';
import { UserSyndicateService } from '../userSyndicates';

jest.mock("@prisma/client");  


const mockDate = new Date('2023-08-19T18:25:47.937Z');
jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

          

describe("GET /userSyndicates/syndicates/:syndicateId", () => {
  const testUserSyndicates :any[]= [
    {
        "id": 1,
        "start_date": new Date("2023-07-13T00:00:00.000Z"),
        "users": {
            "id": 1,
            "first_name": "John",
            "last_name": "Doe",
            "email": "JohnDoe@Gmail.com"
        },
        "syndicates": {
            "id": 1,
            "created_date": new Date("2023-07-10T00:00:00.000Z"),
            "name": "The Thunderbolts",
            "description": "For those who strike like lightning!",
            "avatar": "thunderbolts.jpg"
        },
        "roles": {
            "name": "Leader"
        }
    }
]
const testUserSyndicatesResponse :IUserSyndicate[]= [
    {
        "id": 1,
        "startDate": new Date("2023-07-13T00:00:00.000Z"),
        "users": {
            "id": 1,
            "firstName": "John",
            "lastName": "Doe",
            "email": "JohnDoe@Gmail.com"
        },
        "syndicates": {
            "id": 1,
            "createdDate": new Date("2023-07-10T00:00:00.000Z"),
            "name": "The Thunderbolts",
            "description": "For those who strike like lightning!",
            "avatar": "thunderbolts.jpg"
        },
        "roles": {
            "id":1,
            "name": "Leader"
        }
    }
]

     
      test("get all userSyndicatesById", async () => {
        prismaAsAny.user_syndicates = {
          findMany: jest.fn().mockResolvedValueOnce(testUserSyndicates),
        };
        const result = await UserSyndicateService.getUserSyndicateBySyndicateId(1);
        expect(prisma.user_syndicates.findMany).toHaveBeenCalledTimes(1);
        expect(result).toEqual(testUserSyndicatesResponse);
      });
afterEach(()=>{
    jest.clearAllMocks()
})
    });
 
 


    describe("GET /userSyndicates/users/:userId", () => {
        const testUserSyndicates :any[]= 
            [
                {
                    "id": 1,
                    "start_date": new Date("2023-07-13T00:00:00.000Z"),
                    "users": {
                        "id": 1,
                        "first_name": "John",
                        "last_name": "Doe",
                        "email": "JohnDoe@Gmail.com"
                    },
                    "syndicates": {
                        "id": 1,
                        "created_date": new Date("2023-07-10T00:00:00.000Z"),
                        "name": "The Thunderbolts",
                        "description": "For those who strike like lightning!",
                        "avatar": "thunderbolts.jpg"
                    },
                    "roles": {
                        "name": "Leader"
                    }
                }
            ]
      const testUserSyndicatesResponse :IUserSyndicate[]= [
          {
              "id": 1,
              "startDate": new Date("2023-07-13T00:00:00.000Z"),
              "users": {
                  "id": 1,
                  "firstName": "John",
                  "lastName": "Doe",
                  "email": "JohnDoe@Gmail.com"
              },
              "syndicates": {
                  "id": 1,
                  "createdDate": new Date("2023-07-10T00:00:00.000Z"),
                  "name": "The Thunderbolts",
                  "description": "For those who strike like lightning!",
                  "avatar": "thunderbolts.jpg"
              },
              "roles": {
                  "id":1,
                  "name": "Leader"
              }
          }
      ]
      
           
            test("get all userSyndicatesByUserId", async () => {
              prismaAsAny.user_syndicates = {
                findMany: jest.fn().mockResolvedValueOnce(testUserSyndicates),
              };
              const result = await UserSyndicateService.getSyndicatesByUserId(1);
              expect(prisma.user_syndicates.findMany).toHaveBeenCalledTimes(1);
              expect(result).toEqual(testUserSyndicatesResponse);
            });
      afterEach(()=>{
          jest.clearAllMocks()
      })
          });



          describe("/POST /userSyndicate", () => {
  const testCreateUserSyndicate = {
    
        "id": 1,
        "start_date": new Date("2023-07-13T00:00:00.000Z"),
        "user_id": 1,
        "syndicate_id": 1,
        "role_id": 1
    };

 
 

            it("should create a new user Syndicate", async () => {
              prismaAsAny.user_syndicates = { 
                create: jest.fn().mockResolvedValueOnce(testCreateUserSyndicate),
            };
          const result = await UserSyndicateService.createUserSyndicate(testCreateUserSyndicate);
          console.log("hi"+result)
          expect(prisma.user_syndicates.create).toHaveBeenCalledTimes(1);
          expect(result).toEqual(testCreateUserSyndicate.start_date);
              
            });
          
          
          });
 


          describe("GET /userSyndicates/userSyndicate/:userSyndicateId", () => {
            const testUserSyndicatesBySyndicateId: any = {
                "id": 1,
                "start_date": new Date("2023-07-13T00:00:00.000Z"),
                "user_id": 1,
                "syndicate_id": 1,
                "role_id": 1
            };
        
            const testUserSyndicatesByIdResponse: any = {
                "id": 1,
                "startDate": new Date("2023-07-13T00:00:00.000Z"),
                "userId": 1,
                "syndicateId": 1,
                "roleId": 1
            };
        
            test("get userSyndicate by ID", async () => {
                prismaAsAny.user_syndicates = {
                    findUnique: jest.fn().mockResolvedValueOnce(testUserSyndicatesBySyndicateId),
                };
                const result = await UserSyndicateService.getUserSyndicateByUserSyndicteId(1);
                expect(prismaAsAny.user_syndicates.findUnique).toHaveBeenCalledTimes(1);
                expect(result).toEqual(testUserSyndicatesByIdResponse);
            });
        
            afterEach(() => {
                jest.clearAllMocks();
                jest.restoreAllMocks();
            });
        });
        
 
        describe("PUT /updateRole/:userSyndicateId", () => { 

            const exampleUpdateRole= {
             "role_id": 2
            };
              it("should get update user by id", async () => {
                prismaAsAny.user_syndicates = {
                  update: jest.fn().mockReturnValueOnce(exampleUpdateRole),
                };
          
                const result = await UserSyndicateService.updateUserSyndicateDetails(exampleUpdateRole);
                expect(prisma.user_syndicates.update).toHaveBeenCalledTimes(1);
                expect(result).toEqual(exampleUpdateRole);
              });
            });

    
            describe('deleteUserSyndicatesById', () => {


                it('should delete the user Syndicate by ID', async () => {
                    prismaAsAny.user_syndicates = {
                        delete: jest.fn()
                    }
               
              
                  
                  const result = await UserSyndicateService.deleteUserSyndicateById(1);
              
                  
                  expect(prisma.user_syndicates.delete).toHaveBeenCalledTimes(1);
              
                });
              });  