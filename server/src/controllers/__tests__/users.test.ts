import { prismaAsAny } from '../../test-utils/prisma';
import { prisma } from '../../utils/prisma';
import { UserService } from  '../../services/users';
import httpMocks, { createResponse, MockResponse } from "node-mocks-http";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { when } from "jest-when";
import { UserController } from '../users';
import { error } from 'console';
import { IUser } from '../../interfaces';




jest.mock("@prisma/client");  
jest.mock("../../services/users");
let testUser = [{}] as any[];
let testUserResult = [{}] as any[];

describe("GET /users", () => {
    test("returns status code `200` and an array of users", async () => {
        const request = httpMocks.createRequest({
          method: "GET",
          url: "/api/users/",
        });
        const response: MockResponse<Response> = createResponse();
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
                 testUserResult = [{
                  id: 1,
                        firstName: "John",
                        lastName: "Smith",
                        password:"password",
                        email: "johnsmith@email.com",
                        image: "image",
                        balance: 0,   
                        userTypes:{ id: 1,
                          name: "user",}
                    }];
        when(UserService.getAll)
          .calledWith()
          .mockReturnValueOnce(Promise.resolve(testUser) );
  
        await UserController.getAllUsers(request, response);
  
        expect(response._getStatusCode()).toEqual(StatusCodes.OK);
        expect(response._getJSONData()[0]).toEqual(testUser[0]);
      });

    });

    describe("getUserById", () => {
        it("returns status code `200` and an array of users", async () => {
          const request = httpMocks.createRequest({
            method: "GET",
            url: "/api/users/1",
            params: {
              userId: 1,
            },
          });
          const response: MockResponse<Response> = createResponse();
          const returnValue :any = {
            "id": 1,
            "firstName": "Thomas",
            "lastName": "mckee",
            "password":"password",
            "email": "JohnSmith@example.com",
             "image": "image",
             "balance":0,
             "userTypes":{ "id": 1,
             " name": "user",}
          };
          when(UserService.getUserById)
            .calledWith(1)
            .mockReturnValueOnce(Promise.resolve(returnValue));
    
          await UserController.getUserById(request, response);
    
          expect(response._getStatusCode()).toEqual(StatusCodes.OK);
          expect(response._getJSONData()).toEqual(returnValue);
        });
        //negative testing
        it("returns status code `404` if an error occurs", async () => {
          const request = httpMocks.createRequest({
            method: "GET",
            url: "/api/users/",
            params: {
              userId: 1,
            },
          });
          const response: MockResponse<Response> = createResponse();
          await UserController.getUserById(request, response);
    
          expect(response._getStatusCode()).toEqual(
            StatusCodes.NOT_FOUND
          );
        });
      });
    

  describe("updateUserDetails", () => {
    const updateBody = {
      id: 1,
      firstName: "John",
      lastName: "Smith",
      email: "JohnSmith@example.com",
      image: "image"
      
 
    };
    //invalid update body
    const invalidUpdateBody = {
      id: 1,
  firstName : "",
  lastName: "",
  email : "",
  image: ""
    };
    it("returns status code `200` if user is successfully created", async () => {
      const request = httpMocks.createRequest({
        method: "PUT",
        url: "/api/users",
        body: updateBody,
      });
      const response: MockResponse<Response> = createResponse();
      const returnValue = {
        userId: 1,
        firstName : "Thoams",
        lastName: "mckee",
        email: "JohnSmith@example.com",
        image: "image"
      };
      when(UserService.updateUserDetails)
        .calledWith(updateBody)
        .mockReturnValueOnce(Promise.resolve(returnValue));

      await UserController.updateUserDetails(request, response);

      expect(response._getStatusCode()).toEqual(StatusCodes.OK);
    });
    it("returns status code `400` if an error occurs", async () => {
      const request = httpMocks.createRequest({
        method: "PUT",
        url: "/api/update/users",
        body: invalidUpdateBody,
      });
      const response: MockResponse<Response> = createResponse();

      when(UserService.updateUserDetails)
        .calledWith(invalidUpdateBody)
        .mockImplementationOnce(() => {
          throw Error("Error getting user by id");
        });

      await UserController.updateUserDetails(request, response);

      expect(response._getStatusCode()).toEqual(
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    });
  });
  