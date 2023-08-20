
import { UserService } from  '../../services/users';
import httpMocks, { createResponse, MockResponse } from "node-mocks-http";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { SignUpController } from '../signup';

jest.mock("@prisma/client");  
jest.mock("../../services/users");
//testing making user syndicate
describe("signUp", () => {
    const createBody : any = {
      firstName: "thomas",
      lastName: "McKee",
      email: "Thomasmckee1234@gmail.com",
      password: "qwerty1@"
    };
  console.log(createBody)
  it("returns status code `200` if user syndicate is successfully created", async () => {
    const request = httpMocks.createRequest({
      method: "POST",
      url: "/api/users/create",
      body: createBody,
    });
  
    const response: MockResponse<Response> = createResponse();
    const returnValue : any = {
      id: 1,
      firstName: "thomas",
      lastName: "McKee",
      email: "Thomasmckee1234@gmail.com",
      password: "qwerty1@"
    };
  
    // Here we mock the UserService.createUser function to return a Promise that resolves to returnValue
    UserService.createUser = jest.fn().mockResolvedValue(returnValue);
  
    await SignUpController.createUser(request, response);
  
    expect(response._getStatusCode()).toEqual(StatusCodes.OK);
    expect(response._getJSONData()).toEqual(returnValue);
  });
  
  });