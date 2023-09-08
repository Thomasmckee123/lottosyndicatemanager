import { IUser } from '../../interfaces';
import { prismaAsAny } from '../../test-utils/prisma';
import { prisma } from '../../utils/prisma';
import { UserService } from '../users';

jest.mock("@prisma/client");  



          

describe("GET /users", () => {
  const testUser = [{
    
      id: 1,
      first_name: "John",
      last_name: "Doe",
      email: "JohnDoe@Gmail.com",
      image: "image",
      balance: 0,
      user_types:{ id: 1,
        name: "user",}
  
          }];
          const testResponse = [{
    
            id: 1,
            firstName: "John",
            lastName: "Doe",
            email: "JohnDoe@Gmail.com",
            image: "image",
            balance: 0,
            userTypes:{ id: 1,
              name: "user",}
        
                }];
      
     
      test("get all users", async () => {
        prismaAsAny.users = {
          findMany: jest.fn().mockResolvedValueOnce(testUser),
        };
        const result = await UserService.getAll();
        expect(prisma.users.findMany).toHaveBeenCalledTimes(1);
        expect(result).toEqual(testResponse);
      });

    });
 
    describe("GET /users/:userId", () => {
      
     const testUser = {
        "id" : 1,
        "first_name": "John",
        "last_name": "Smith",
        "password": "password",
        "email": "johnsmith@email.com",
        "image": "image",
        "balance": 0,
        "user_types": {

            "id": 1,
            "name": "user"
        }
        
      }
    const testUserResult:any = {
          id: testUser?.id,
          firstName:testUser?.first_name,
          lastName:testUser?.last_name,
          password:testUser?.password,
          email:testUser?.email,
          image:testUser?.image,
          balance:testUser?.balance,
          userTypes:{
             id: testUser?.id,
            name: "user",}

         }
test("get user by id", async () => {
prismaAsAny.users = {
findUnique: jest.fn().mockResolvedValueOnce(testUser),

};
const result = await UserService.getUserById(1);

expect (prisma.users.findUnique).toHaveBeenCalledTimes(1);
expect(result).toEqual(testUserResult);
});

    });

 
    /**
     * doing update users
     */
  describe("PUT /users/:userId", () => { 

    const exampleUpdateUsers: IUser = {
      "id" : 1,
        "firstName": "John",
        "lastName": "Smith",
        "password": "password",
        "email": "johnsmith@email.com",
        "image": "image",
        "balance": 0,
    };
      it("should get update user by id", async () => {
        prismaAsAny.users = {
          update: jest.fn().mockReturnValueOnce(exampleUpdateUsers),
        };
  
        const result = await UserService.updateUserDetails(exampleUpdateUsers);
        expect(prisma.users.update).toHaveBeenCalledTimes(1);
        expect(result).toEqual(exampleUpdateUsers);
      });
    });
    
    describe("getUserByEmail", () => {
      it("should return a user with their email", async () => {
        const testUseremail= [{
    
         "id" : 1,
        "first_name": "John",
        "last_name": "Smith",
        "password": "password",
        "email": "johnsmith@email.com",
        "image": "image",
        "balance": 0,
        "user_typs:": {
        "id": "1",
        "name": "user"}
      
              }];

              const testUserEmailResult:any = {
                id: testUseremail[0]?.id,
                firstName:testUseremail[0]?.first_name,
                lastName:testUseremail[0]?.last_name,
                password:testUseremail[0]?.password,
                email:testUseremail[0]?.email,
                image:testUseremail[0]?.image,
                balance:testUseremail[0]?.balance,
                userTypes:{
                    id: testUseremail[0]?.id,
                    name: "user",}
                
               }


       
       


 prismaAsAny.users = {
          findMany: jest.fn().mockReturnValueOnce(testUseremail),
        };
            
       
        const result = await UserService.getByEmail(testUseremail[0].email);
        if(result)
        expect(result).toEqual(testUserEmailResult);
      });
    });
  
    /**
     * delete user
     */
  
    /**
     * doing update users
     */
  describe("PUT /users/delete:id", () => { 
     const exampleDeleteUsers:any = {
      id: 1,
      firstName: "DELETED USER ",
      lastName: "DELETED",
      
      email: "DELETED",
    };
      it("should get delete user by id", async () => {
        prismaAsAny.users = {
          update: jest.fn().mockReturnValueOnce(exampleDeleteUsers),
        };
  
        const result = await UserService.deleteUserById(exampleDeleteUsers.userId);
        expect(prisma.users.update).toHaveBeenCalledTimes(1);
        expect(result).toEqual(exampleDeleteUsers);
      });
    });