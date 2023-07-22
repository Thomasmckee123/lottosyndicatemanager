import { IUser } from '../../interfaces';
import { prismaAsAny } from '../../test-utils/prisma';
import { prisma } from '../../utils/prisma';
import { UserService } from '../users';

jest.mock("@prisma/client");  
//test for user
const testUser = [{
    id: 1,
          first_name: "John",
          last_name: "Smith",
          email: "johnsmith@email.com"}];
          //test for user result 
          const testUserResult = [{
            userId: 1,
                  firstName: "John",
                  lastName: "Smith",
                  email: "johnsmith@email.com"}];
            //case for user id
         const testUserIdResult = {
       id: 1,
     first_name: "John",
        last_name: "Smith",
     email: "johnsmith@email.com"};
     //test case for user email
     const testUseremailResult = {
        id: 1,
              first_name: "John",
              last_name: "Smith",
              email: "johnsmith@email.com"};

describe("GET /users", () => {
      test("get all users", async () => {
        prismaAsAny.users = {
          findMany: jest.fn().mockResolvedValueOnce(testUser),
        };
        const result = await UserService.getAll();
        expect(prisma.users.findMany).toHaveBeenCalledTimes(1);
        expect(result).toEqual(testUserResult);
      });

    });
    /**
     * getting user by id
     */
    describe("getUserById", () => {
        it("should return a user with their id", async () => {
          prismaAsAny.users = {
            findUnique: jest.fn().mockReturnValueOnce(testUserIdResult),
          };
          const result = await UserService.getUserById(1);
       
         
          expect(prisma.users.findUnique).toHaveBeenCalledTimes(1);
          
          if(result){
          expect(result.id).toEqual(testUserIdResult.id);
        }
        });
      });

  const exampleUpdateUsers: IUser = {
    userId: 1,
    firstName: "John ",
    lastName: "Smyth",
    
    email: "JohnSmyth@example.com",
  };
  /**
   * doing update users
   */
describe("PUT /users/:id", () => {
    it("should get update user by id", async () => {
      prismaAsAny.users = {
        update: jest.fn().mockReturnValueOnce(exampleUpdateUsers),
      };

      const result = await UserService.updateUserDetails(exampleUpdateUsers);
      expect(prisma.users.update).toHaveBeenCalledTimes(1);
      expect(result).toEqual(exampleUpdateUsers);
    });
  });

/**
 * testing creating a user syndicate
 */

const userSyndicateMock = {

  start_date: new Date(),
  syndicate_id: 1,
  user_id: 1,
  role_id: 1,
};

/** 
 * creating user syndicate
 * 
 */

  
  describe("/POST /createUserSyndicate", () => {
 
    it("should create a new syndicate", async () => {
      prismaAsAny.user_syndicates = { 
        create: jest.fn().mockResolvedValueOnce(userSyndicateMock),
    };

  const result = await UserService.createUserSyndicate(userSyndicateMock);
  console.log("hi"+result)
  expect(prisma.user_syndicates.create).toHaveBeenCalledTimes(1);
  expect(result).toEqual(userSyndicateMock.start_date);
      
    });
  
  
  });

/**
 * getting user by email
 */
describe("getUserByEmail", () => {
    it("should return a user with their email", async () => {
      prismaAsAny.users = {
        findMany: jest.fn().mockReturnValueOnce(testUseremailResult),
      };
      const result = await UserService.getByEmail(testUseremailResult.email);
      expect(result).toEqual(testUseremailResult);
    });
  });

  /**
   * delete user
   */
  const exampleDeleteUsers: IUser = {
    userId: 1,
    firstName: "DELETED USER ",
    lastName: "DELETED",
    
    email: "DELETED",
  };
  /**
   * doing update users
   */
describe("PUT /users/delete:id", () => {
    it("should get delete user by id", async () => {
      prismaAsAny.users = {
        update: jest.fn().mockReturnValueOnce(exampleDeleteUsers),
      };

      const result = await UserService.deleteUserById(exampleDeleteUsers.userId);
      expect(prisma.users.update).toHaveBeenCalledTimes(1);
      expect(result).toEqual(exampleDeleteUsers);
    });
  });