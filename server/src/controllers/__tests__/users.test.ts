import { prismaAsAny } from '../../test-utils/prisma';
import { prisma } from '../../utils/prisma';
import { UserService } from  '../../services/users';
import httpMocks, { createResponse, MockResponse } from "node-mocks-http";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { when } from "jest-when";
import { UserController } from '../users';




jest.mock("@prisma/client");  
jest.mock("../../services/users");
const testUser = [{
    id: 1,
          first_name: "John",
          last_name: "Smith",
          email: "johnsmith@email.com"}]; 
          const testUserResult = [{
            userId: 1,
                  firstName: "John",
                  lastName: "Smith",
                  email: "johnsmith@email.com"}];
describe("GET /users", () => {
    test("returns status code `200` and an array of users", async () => {
        const request = httpMocks.createRequest({
          method: "GET",
          url: "/api/users/",
        });
        const response: MockResponse<Response> = createResponse();
        const returnValue = [
          {
            userId: 1,
            firstName: "John",
            lastName: "Smith",
            email: "JohnSmith@email.com",
          }
        ];
        when(UserService.getAll)
          .calledWith()
          .mockReturnValueOnce(Promise.resolve(returnValue));
  
        await UserController.getAllUsers(request, response);
  
        expect(response._getStatusCode()).toEqual(StatusCodes.OK);
        expect(response._getJSONData()[0]).toEqual(returnValue[0]);
      });
      test("returns status code `500` if an error occurs", async () => {
        const request = httpMocks.createRequest({
          method: "GET",
          url: "/api/users/",
        });
        const response: MockResponse<Response> = createResponse();
  
        when(UserService.getAll)
          .calledWith()
          .mockImplementationOnce(() => {
            throw Error("Error getting all users");
          });
  
        await UserController.getAllUsers(request, response);
  
        expect(response._getStatusCode()).toEqual(
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      });
    });