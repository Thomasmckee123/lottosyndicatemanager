
import httpMocks, { createResponse, MockResponse } from "node-mocks-http";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { when } from "jest-when";

import { SyndicateService } from '../../services/syndicates';
import { SyndicateController } from '../syndicates';




jest.mock("@prisma/client");  
jest.mock("../../services/syndicates");
const testSyndicate :any[]= [
    {
        "id": 1,
        "createdDate": "2023-07-10T00:00:00.000Z",
        "name": "The Thunderbolts",
        "description": "For those who strike like lightning!",
        "avatar": "thunderbolts.jpg",
        "ownerId": 1,
        "users": {
            "id": 1,
            "firstName": "John",
            "lastName": "Doe"
        }
    },];
describe("GET /syndicates", () => {
    test("returns status code `200` and an array of users", async () => {
        const request = httpMocks.createRequest({
          method: "GET",
          url: "/api/syndicates/",
        });
        const response: MockResponse<Response> = createResponse();
        const returnValue: any = [{
         
                    "id": 1,
                    "createdDate": "2023-07-10T00:00:00.000Z",
                    "name": "The Thunderbolts",
                    "description": "For those who strike like lightning!",
                    "avatar": "thunderbolts.jpg",
                    "ownerId": 1,
                    "users": {
                        "id": 1,
                        "firstName": "John",
                        "lastName": "Doe"
                    }
                },];
        when(SyndicateService.getAll)
          .calledWith()
          .mockReturnValueOnce(Promise.resolve(returnValue));
  
        await SyndicateController.getAllSyndicates(request, response);
  
        expect(response._getStatusCode()).toEqual(StatusCodes.OK);
        expect(response._getJSONData()[0]).toEqual(returnValue[0]);
      });

    });





    //create syndicate
    describe("createUserSyndicate", () => {
    const validCreateBody = {
      created_date: new Date(),
      name: "test syndicate",
      description: "new syndicate",
      avatar:"newSyndicate.png",
      owner_id: 1
    }
      
    
      it("returns status code `200` if user syndciate is successfully created", async () => {
        const request = httpMocks.createRequest({
          method: "POST",
          url: "/1/syndicates/1",
          body: validCreateBody,
        });
        const response: MockResponse<Response> = createResponse();
        const returnValue = {
          id: 1,
  
          roleId: 9999
        };
        when(SyndicateService.createSyndicate)
          .calledWith(validCreateBody)
          .mockReturnValueOnce(Promise.resolve(1));
  
        await SyndicateController.createSyndicate(request, response);
  
        expect(response._getStatusCode()).toEqual(StatusCodes.OK);
      });
   
    });


    //update a syndicate
    describe("updateUserDetails", () => {
      const updateBody = {
        createdDate: new Date(),
      name: "test syndicate",
      description: "new syndicate",
      avatar:"newSyndicate.png",
      ownerId: 1
   
      };
      //invalid update body
      const invalidUpdateBody = {
        createdDate: new Date(),
        name: "",
        description: "",
        avatar:"n",
        ownerId: 1
      };
      it("returns status code `200` if user is successfully created", async () => {
        const request = httpMocks.createRequest({
          method: "PUT",
          url: "/api/syndicates/1",
          body: updateBody,
        });
        const response: MockResponse<Response> = createResponse();
        const returnValue = {
          createdDate: new Date(),
      name: "test syndicate",
      description: "new syndicate",
      avatar:"newSyndicate.png",
      ownerId: 1,
          
        };
        when(SyndicateService.updateSyndicateDetails)
          .calledWith(updateBody)
          .mockReturnValueOnce(Promise.resolve(returnValue));
  
        await SyndicateController.UpdateSyndicateDetails(request, response);
  
        expect(response._getStatusCode()).toEqual(StatusCodes.OK);
      });
      it("returns status code `400` if an error occurs", async () => {
        const request = httpMocks.createRequest({
          method: "PUT",
          url: "/api/update/syndicates",
          body: invalidUpdateBody,
        });
        const response: MockResponse<Response> = createResponse();
  
        when(SyndicateService.updateSyndicateDetails)
          .calledWith(invalidUpdateBody)
          .mockImplementationOnce(() => {
            throw Error("Error getting user by id");
          });
  
        await SyndicateController.UpdateSyndicateDetails(request, response);
  
        expect(response._getStatusCode()).toEqual(
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      });
    });
    