
import httpMocks, { createResponse, MockResponse } from "node-mocks-http";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { when } from "jest-when";

import { SyndicateService } from '../../services/syndicates';
import { SyndicateController } from '../syndicates';
import { ISyndicate } from "../../interfaces";




jest.mock("@prisma/client");  
jest.mock("../../services/syndicates");
const testSyndicate = [{
  start_date: new Date(),
    users: {
      id: 1,
      first_name: "Thomas",
      last_name: "Mckee",
      email: "mckeethomas293@gmail.com",
    },
    syndicates: {
      created_date: new Date(),
      name: "Thomas",
      description: "yesssss",
      avatar: "dog.png",
    },
    roles: {
      name: "leader"
    },  
  }];
describe("GET /syndicates", () => {
    test("returns status code `200` and an array of users", async () => {
        const request = httpMocks.createRequest({
          method: "GET",
          url: "/api/syndicates/",
        });
        const response: MockResponse<Response> = createResponse();
        const returnValue: any = [{
          start_date: "2022/10/10",
          users: {
            id: 1,
            first_name: "Thomas",
            last_name: "Mckee",
            email: "mckeethomas293@gmail.com",
          },
          syndicates: {
            created_date : "2020/10/10",
            name: "Thomas",
            description: "yesssss",
            avatar: "dog.png",
          },
          roles: {
            name: "leader"
          },  ail: "JohnSmith@email.com",
          }
        ];
        when(SyndicateService.getAll)
          .calledWith()
          .mockReturnValueOnce(Promise.resolve(returnValue));
  
        await SyndicateController.getAllSyndicates(request, response);
  
        expect(response._getStatusCode()).toEqual(StatusCodes.OK);
        expect(response._getJSONData()[0]).toEqual(returnValue[0]);
      });

    });



    describe("getSyndicatesById", () => {
      it("returns status code `200` and an array of syndicates", async () => {     
               const returnValue : any = [{
                start_date: "2023-07-25T10:24:39.694Z",
                users: {
                  id: 1,
                  first_name: "Thomas",
                  last_name: "Mckee",
                  email: "mckeethomas293@gmail.com",
                },
                syndicates: {
                   created_date: "2023-07-25T10:24:39.694Z",
                  name: "Thomas",
                  description: "yesssss",
                  avatar: "dog.png",
                },
                roles: {
                  name: "leader"
                },  
              }];
        console.log(returnValue)
        const request = httpMocks.createRequest({
          method: "GET",
          url: "/api/syndicates/1/games/1",
          params: {
            userId: '1',
        
          }
        });

        const response: MockResponse<Response> = createResponse();

      
        when(SyndicateService.getSyndicatesByUserId)
          .calledWith(1)
          .mockReturnValueOnce(Promise.resolve(returnValue));
  console.log(returnValue)
        await SyndicateController.getSyndicatesByUserId(request, response);
  console.log(response)
        expect(response._getStatusCode()).toEqual(StatusCodes.OK);
        expect(response._getJSONData()).toEqual(returnValue);
      });
      it("returns status code `400` if invalid userId", async () => {
        const request = httpMocks.createRequest({
          method: "GET",
          url: "/api/syndicates/users/NaN",
          params: {
            userId: NaN,
          },
        });
        const response: MockResponse<Response> = createResponse();
        const returnValue : any = [{
          start_date: new Date(),
          users: {
            id: 1,
            first_name: "Thomas",
            last_name: "Mckee",
            email: "mckeethomas293@gmail.com",
          },
          syndicates: {
            created_date: new Date(),
            name: "Thomas",
            description: "yesssss",
            avatar: "dog.png",
          },
          roles: {
            name: "leader"
          },  
        }];
       
        when(SyndicateService.getSyndicatesByUserId)
          .calledWith(NaN);
          //.mockReturnValueOnce(Promise.resolve(returnValue));
  
        await SyndicateController.getSyndicatesByUserId(request, response);
  
        expect(response._getStatusCode()).toEqual(StatusCodes.BAD_REQUEST);
      });
      it("returns status code `500` if an error occurs", async () => {
        const request = httpMocks.createRequest({
          method: "GET",
          url: "/api/syndicates/users/1",
          params: {
            userId: 1,
          },
        });
        const response: MockResponse<Response> = createResponse();
  
        when(SyndicateService.getSyndicatesByUserId)
          .calledWith(1)
          .mockImplementationOnce(() => {
            throw Error("Error getting client by id");
          });
  
        await SyndicateController.getSyndicatesByUserId(request, response);
  
        expect(response._getStatusCode()).toEqual(
          StatusCodes.INTERNAL_SERVER_ERROR
        );
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
          start_date: new Date(),
  
          role_id: 9999
        };
        when(SyndicateService.createSyndicate)
          .calledWith(validCreateBody)
          .mockReturnValueOnce(Promise.resolve(new Date()));
  
        await SyndicateController.createSyndicate(request, response);
  
        expect(response._getStatusCode()).toEqual(StatusCodes.OK);
      });
   
    });


    //update a syndicate
    describe("updateUserDetails", () => {
      const updateBody = {
        created_date: new Date(),
      name: "test syndicate",
      description: "new syndicate",
      avatar:"newSyndicate.png",
      owner_id: 1
   
      };
      //invalid update body
      const invalidUpdateBody = {
        created_date: new Date(),
        name: "",
        description: "",
        avatar:"n",
        owner_id: 1
      };
      it("returns status code `200` if user is successfully created", async () => {
        const request = httpMocks.createRequest({
          method: "PUT",
          url: "/api/syndicates/1",
          body: updateBody,
        });
        const response: MockResponse<Response> = createResponse();
        const returnValue = {
          created_date: new Date(),
      name: "test syndicate",
      description: "new syndicate",
      avatar:"newSyndicate.png",
      owner_id: 1,
          
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
    