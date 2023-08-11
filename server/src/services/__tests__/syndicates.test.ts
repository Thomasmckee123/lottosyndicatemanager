import { IUserSyndicate } from '../../interfaces/syndicates';
import { prismaAsAny } from '../../test-utils/prisma';
import { prisma } from '../../utils/prisma';
import { SyndicateService } from '../syndicates';

const testSyndicate = [{ 
id: 1,
created_date: 2022/10/1,
name: "test syndicate",
description: "very new syndicate",
avatar: "test.png",
owner_id: 1,
users: {
  id: 1,
  first_name: "Thomas",
  last_name: "Mckee",
}}];
//test syndicate by id
const testSyndicateById: IUserSyndicate[] = [{
    start_date: new Date("2020/10/2"),
    users: {
      id: 1,
      first_name: "Thomas",
      last_name: "mckee",
      email: "tmckee09@gmail.com",
    },
    syndicates: {
      created_date:  new Date("2020/10/2"),
      name: "string",
      description: "string",
      avatar: "string" ,
    },
    roles: {
      name: "string"
    },}]

    //test posting syndicate
const testCreateSyndicate = {
    created_date: new Date(),
    name: "syndicate.name",
    description:"syndicate.description",
    avatar:"syndicate.avatar",
    owner_id: 1

}
//example update syndicates
const testUpdateSyndicate = {
    name: "syndicate.name2",
    description: "syndicate.description1",
    avatar:"syndicate.avatar2"
}
//test delete syndicates
const testdeleteSyndicate = {
    id: 1,
    created_date: new Date(),
    name:"DELETED",
    description: "DELETEDUSERPASS",
    avatar: "DELETED",
}
/**
 * getting all the syndicates
 * 
 */
describe("GET /syndicates", () => {
    test("get all syndicates", async () => {
      prismaAsAny.syndicates= {
        findMany: jest.fn().mockResolvedValueOnce(testSyndicate),
      };
      const result = await SyndicateService.getAll();
      expect(prisma.syndicates.findMany).toHaveBeenCalledTimes(1);
      expect(result).toEqual(testSyndicate);
    });

  });
  /**
     * getting syndictes by id
     */
  describe("/GET/SyndicateById", () => {
    it("should return a syndicate with their id", async () => {
      prismaAsAny.user_syndicates = {
        findMany: jest.fn().mockReturnValueOnce(testSyndicateById),
      };
      const result = await SyndicateService.getSyndicatesByUserId(1 );
   
     
      expect(prisma.user_syndicates.findMany).toHaveBeenCalledTimes(1);
      
      if(result){
      expect(result).toEqual(testSyndicateById);
    }
    });
  });
  /**
 * creating syndicates
 */
  describe("/POST /createSyndicate", () => {
 
    it("should create a new syndicate", async () => {
      prismaAsAny.syndicates = { 
        create: jest.fn().mockResolvedValueOnce(testCreateSyndicate),
    };
     console.log(testCreateSyndicate);
  const result = await SyndicateService.createSyndicate(testCreateSyndicate);
  console.log("hi"+result)
  expect(prisma.syndicates.create).toHaveBeenCalledTimes(1);
  expect(result).toEqual(testCreateSyndicate.created_date);
      
    });
  
  
  });



  /**
   * doing update syndicates
   */
describe("PUT /syndicates/:id", () => {
    it("should get update syndicate by id", async () => {
      prismaAsAny.syndicates = {
        update: jest.fn().mockReturnValueOnce(testUpdateSyndicate),
      };

      const result = await SyndicateService.updateSyndicateDetails(testUpdateSyndicate);
      expect(prisma.syndicates.update).toHaveBeenCalledTimes(1);
      expect(result).toEqual(testUpdateSyndicate);
    });
  });
//deleting a syndicate
  describe("PUT /syndicates/delete/:id", () => {
    it("should get delete syndicate by id", async () => {
      prismaAsAny.syndicates = {
        update: jest.fn().mockReturnValueOnce(testdeleteSyndicate),
      };

      const result = await SyndicateService.deleteSyndicateById(1);
      expect(prisma.syndicates.update).toHaveBeenCalledTimes(1);
      expect(result).toEqual(testdeleteSyndicate);
    });
  });