
import { ISyndicate} from '../../interfaces';
import { prismaAsAny } from '../../test-utils/prisma';
import { prisma } from '../../utils/prisma';
import { SyndicateService } from '../syndicates';


describe("GET /syndicates", () => {
    const testSyndicates :any[]= [
        {
            "id": 1,
            "created_date":new Date("2023-07-10T00:00:00.000Z"),
            "name": "The Thunderbolts",
            "description": "For those who strike like lightning!",
            "avatar": "thunderbolts.jpg",
            "owner_id": 1,
            "users": {
                "id": 1,
                "first_name": "John",
                "last_name": "Doe"
            }
        },
      ]
  const testSyndicatesResponse :ISyndicate[]= [
    {
        "id": 1,
        "createdDate":new Date("2023-07-10T00:00:00.000Z"),
        "name": "The Thunderbolts",
        "description": "For those who strike like lightning!",
        "avatar": "thunderbolts.jpg",
        "ownerId": 1,
        "users": {
            "id": 1,
            "firstName": "John",
            "lastName": "Doe"
        }
    },
  ]
  
       
        test("get all syndicates", async () => {
          prismaAsAny.syndicates = {
            findMany: jest.fn().mockResolvedValueOnce(testSyndicates),
          };
          const result = await SyndicateService.getAll()
          expect(prisma.syndicates.findMany).toHaveBeenCalledTimes(1);
          expect(result).toEqual(testSyndicatesResponse);
        });
  afterEach(()=>{
      jest.clearAllMocks()
  })
      });
   
        describe("GET /syndicates/:id", () => {
const testSyndicate :any= {
    "id": 1,
    "created_date":new Date("2023-07-10T00:00:00.000Z"),
    "name": "The Thunderbolts",
    "description": "For those who strike like lightning!",
    "avatar": "thunderbolts.jpg",
    "owner_id": 1,
    "users": {
        "id": 1,
        "first_name": "John",
        "last_name": "Doe"
    }   
}
const testSyndicateResponse :ISyndicate= {
    "id": 1,
    "createdDate":new Date("2023-07-10T00:00:00.000Z"),
    "name": "The Thunderbolts",
    "description": "For those who strike like lightning!",
    "avatar": "thunderbolts.jpg",
    "ownerId": 1,
    "users": {
        "id": 1,
        "firstName": "John",
        "lastName": "Doe"
    }
}
            test("get syndicate by id", async () => {
                prismaAsAny.syndicates = {
                    findUnique: jest.fn().mockResolvedValueOnce(testSyndicate),
                };
                const result = await SyndicateService.getSyndicateById(1)
                expect(prisma.syndicates.findUnique).toHaveBeenCalledTimes(1);
                expect(result).toEqual(testSyndicateResponse);
                }
            );
            afterEach(()=>{
                jest.clearAllMocks()
            }
            )





        });



        describe("GET /syndicates/:name", () => {
            const testSynicates :any[]= [
                {
                    "id": 1,
                    "created_date":new Date("2023-07-10T00:00:00.000Z"),
                    "name": "The Thunderbolts",
                    "description": "For those who strike like lightning!",
                    "avatar": "thunderbolts.jpg",
                    "owner_id": 1,
                    "users": {
                        "id": 1,
                        "first_name": "John",
                        "last_name": "Doe"
                    }
                },
              ]
          const testSyndicatesResponse :ISyndicate[]= [
            {
                "id": 1,
                "createdDate":new Date("2023-07-10T00:00:00.000Z"),
                "name": "The Thunderbolts",
                "description": "For those who strike like lightning!",
                "avatar": "thunderbolts.jpg",
                "ownerId": 1,
                "users": {
                    "id": 1,
                    "firstName": "John",
                    "lastName": "Doe"
                }
            },
          ]
          
               
                test("get all syndicates", async () => {
                  prismaAsAny.syndicates = {
                    findMany: jest.fn().mockResolvedValueOnce(testSynicates),
                  };
                  const result = await SyndicateService.getSyndicateByName("The Thunderbolts")
                  expect(prisma.syndicates.findMany).toHaveBeenCalledTimes(1);
                  expect(result).toEqual(testSyndicatesResponse);
                });
          afterEach(()=>{
              jest.clearAllMocks()
          })
              });


              describe("POST /syndicates", () => {
               //this test will test the create syndicate function
                const testSyndicate :any= {             
                    "name": "The Thunderbolts",
                    "description": "For those who strike like lightning!",
                    "avatar": "thunderbolts.jpg",
                    "ownerId": 1,
                }
                const testSyndicateResponse :ISyndicate= {
                    "id": 1,
                    "createdDate":new Date("2023-07-10T00:00:00.000Z"),
                    "name": "The Thunderbolts",
                    "description": "For those who strike like lightning!",
                    "avatar": "thunderbolts.jpg",
                    "ownerId": 1,
                    "users": {
                        "id": 1,
                        "firstName": "John",
                        "lastName": "Doe"
                    }
                }
                test("create syndicate", async () => {
                    prismaAsAny.syndicates = {
                        create: jest.fn().mockResolvedValueOnce(testSyndicate),
                    };
                    const result = await SyndicateService.createSyndicate(testSyndicate)
                    expect(prisma.syndicates.create).toHaveBeenCalledTimes(1);
                    expect(result).toEqual(testSyndicate.id);
                    }
                );
                afterEach(()=>{
                    jest.clearAllMocks()
                }
                )
            });


describe("PUT /syndicates/:id", () => {
    //this test will test the create syndicate function
     const testSyndicate :any= {             
         "id":1,
         "name": "The Thunderbolts",
         "description": "For those who strike like lightning!",
         "avatar": "thunderbolts.jpg",
         "ownerId": 1,
     }
     const testSyndicateResponse :ISyndicate= {
         "id": 1,
         "createdDate":new Date("2023-07-10T00:00:00.000Z"),
         "name": "The Thunderbolts",
         "description": "For those who strike like lightning!",
         "avatar": "thunderbolts.jpg",
         "ownerId": 1,
         "users": {
             "id": 1,
             "firstName": "John",
             "lastName": "Doe"
         }
     }
     test("update syndicate", async () => {
         prismaAsAny.syndicates = {
             update: jest.fn().mockResolvedValueOnce(testSyndicate),
         };
         const result = await SyndicateService.updateSyndicateDetails(testSyndicate)
         expect(prisma.syndicates.update).toHaveBeenCalledTimes(1);
         expect(result).toEqual(testSyndicate);
         }
     );
     afterEach(()=>{
         jest.clearAllMocks()
     }
     )
 }
);
/**
 * //deleting syndicate details
  async function deleteSyndicateById(syndicateId: number) {
    let deletedSyndicate;
    try {
      deletedSyndicate= await prisma.syndicates.update({
        where: {
          id: syndicateId,
        },
        data: {
          created_date: new Date(),
          name:"DELETED",
          description: "DELETEDUSERPASS",
          avatar: "DELETED",
        },
      });
    } catch (error) {
      console.log(error);
    }
    return deletedSyndicate;
  }
  this test will test the delete syndicate function
 */
describe("DELETE /syndicates/:id", () => {

    const testSyndicate :any= {             
        "id":1,
        "name": "DELETED",
        "description": "DELETEDUSERPASS",
        "avatar": "DELETED",
        
    }
    const testSyndicateResponse :any= {
        "id":1,
        "name": "DELETED",
        "description": "DELETEDUSERPASS",
        "avatar": "DELETED",
   
    }
    test("delete syndicate", async () => {
        prismaAsAny.syndicates = {
            update: jest.fn().mockResolvedValueOnce(testSyndicate),
        };
        const result = await SyndicateService.deleteSyndicateById(1)
        expect(prisma.syndicates.update).toHaveBeenCalledTimes(1);
        expect(result).toEqual(testSyndicateResponse);
        }
    );
    afterEach(()=>{
        jest.clearAllMocks()
    }
    )
}
);