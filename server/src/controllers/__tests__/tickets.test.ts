
import httpMocks, { createResponse, MockResponse } from "node-mocks-http";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { when } from "jest-when";

import { TicketService } from '../../services/tickets';
import { TicketController } from '../tickets';
import { ITicket, IUserSyndicate } from '../../interfaces';

jest.mock("@prisma/client");  
jest.mock("../../services/tickets");
const testTicket = [{
    id: 1,
    ticketCode: "NA86YWD",
    totalRewardValue: 12342,
    ticketStatus: {
      id: 1,
      name: "Thomas",
    },
    userSyndicates: {
      id: 2,
      users: {
        id: 2,
        firstName: "Thomas",
        lastName: "McKee",
      },
    },
    gameId: 1,}
];
describe("GET /tickets", () => {
    test("returns status code `200` and an array of tickets", async () => {
        const request = httpMocks.createRequest({
          method: "GET",
          url: "/api/tickets/",
        });
        const response: MockResponse<Response> = createResponse();
        const returnValue :any[] = 
        [
            {
                "id": 1,
                "ticketCode": "123456",
                "totalRewardValue": 0,
                "ticketStatus": {
                    "id": 3,
                    "name": "pending"
                },
                "games": {
                    "id": 1,
                    "treasury": 0,
                    "gameTypes": {
                        "id": 1,
                        "name": "euro millions",
                        "drawDate": "2023-08-18T00:00:00.000Z",
                        "reward": 43000000,
                        "image": "euromillions.png",
                        "ticketCost": 2.5
                    },
                    "userSyndicates": {
                        "startDate":"2023-07-13T00:00:00.000Z",
                        "users": {
                            "id": 1,
                            "firstName": "John",
                            "lastName": "Doe",
                            "email": "JohnDoe@Gmail.com",
                            "balance": 0
                        }
                    }
                }
            },];
        when(TicketService.getAll)
          .calledWith()
          .mockReturnValueOnce(Promise.resolve(returnValue));
  
        await TicketController.getAlltickets(request, response);
  
        expect(response._getStatusCode()).toEqual(StatusCodes.OK);
        expect(response._getJSONData()[0]).toEqual(returnValue[0]);
      });
      test("returns status code `404` if not found", async () => {
        const request = httpMocks.createRequest({
          method: "GET",
          url: "/api/tickets/",
        });
        const response: MockResponse<Response> = createResponse();
  

  
        await TicketController.getAlltickets(request, response);
  
        expect(response._getStatusCode()).toEqual(
          StatusCodes.NOT_FOUND
        );
      });
    });

    describe("getTicketsByGameId", () => {
        it("returns status code `200` and an array of tickets", async () => {     
                 const returnValue : any[] = [
                    {
                        "id": 1,
                        "ticketCode": "123456",
                        "totalRewardValue": 0,
                        "ticketStatus": {
                            "id": 3,
                            "name": "pending"
                        },
                        "games": {
                            "id": 1,
                            "treasury": 0,
                            "gameTypes": {
                                "id": 1,
                                "name": "euro millions",
                                "drawDate": "2023-08-18T00:00:00.000Z",
                                "reward": 43000000,
                                "image": "euromillions.png",
                                "ticketCost": 2.5
                            },
                            "userSyndicates": {
                                "startDate": "2023-07-13T00:00:00.000Z",
                                "users": {
                                    "id": 1,
                                    "firstName": "John",
                                    "lastName": "Doe",
                                    "email": "JohnDoe@Gmail.com",
                                    "balance": 0
                                }
                            }
                        }
                    },];
          console.log(returnValue)
          const request = httpMocks.createRequest({
            method: "GET",
            url: "/api/tickets/syndicates/1/games/1",
            params: {
              gameId: 1,
          
            }
          });

          const response: MockResponse<Response> = createResponse();

        
          when(TicketService.ticketsByGameId)
            .calledWith(1)
            .mockReturnValueOnce(Promise.resolve(returnValue));
    console.log(returnValue)
          await TicketController.getTicketsByGameId(request, response);
    console.log(response)
          expect(response._getStatusCode()).toEqual(StatusCodes.OK);
          expect(response._getJSONData()).toEqual(returnValue);
        });
        it("returns status code `400` if invalid userId", async () => {
          const request = httpMocks.createRequest({
            method: "GET",
            url: "/api/clients/users/NaN",
            params: {
              gameId: NaN,
            },
          });
          const response: MockResponse<Response> = createResponse();
          const returnValue :any[] = [
            {
                "id": 1,
                "ticketCode": "123456",
                "totalRewardValue": 0,
                "ticketStatus": {
                    "id": 3,
                    "name": "pending"
                },
                "games": {
                    "id": 1,
                    "treasury": 0,
                    "gameTypes": {
                        "id": 1,
                        "name": "euro millions",
                        "drawDate":"2023-08-18T00:00:00.000Z",
                        "reward": 43000000,
                        "image": "euromillions.png",
                        "ticketCost": 2.5
                    },
                    "userSyndicates": {
                        "startDate": "2023-07-13T00:00:00.000Z",
                        "users": {
                            "id": 1,
                            "firstName": "John",
                            "lastName": "Doe",
                            "email": "JohnDoe@Gmail.com",
                            "balance": 0
                        }
                    }
                }
            },];
         
          when(TicketService.ticketsByGameId)
            .calledWith(NaN)
            .mockReturnValueOnce(Promise.resolve(returnValue));
    
          await TicketController.getTicketsByGameId(request, response);
    
          expect(response._getStatusCode()).toEqual(StatusCodes.BAD_REQUEST);
        });
        it("returns status code `500` if an error occurs", async () => {
          const request = httpMocks.createRequest({
            method: "GET",
            url: "/api/clients/users/1",
            params: {
              gameId: 1,
            },
          });
          const response: MockResponse<Response> = createResponse();
    
          when(TicketService.ticketsByGameId)
            .calledWith(1)
            .mockImplementationOnce(() => {
              throw Error("Error getting client by id");
            });
    
          await TicketController.getTicketsByGameId  (request, response);
    
          expect(response._getStatusCode()).toEqual(
            StatusCodes.INTERNAL_SERVER_ERROR
          );
        });
      });
    

      describe("updateTicketDetails", () => {
        const updateBody = {
            id: 1,
            total_reward_value : 12343,
            ticket_status_id: 2
     
        };
        
        //invalid update body
        const invalidUpdateBody = {
            id: 1,
            total_reward_value : "undefined",
            ticket_status_id: -1
        };
        it("returns status code `200` if user is successfully created", async () => {
          const request = httpMocks.createRequest({
            method: "PUT",
            url: "/api/tickets",
            body: updateBody,
          });
          const response: MockResponse<Response> = createResponse();
          const returnValue = {
            id: 1,
            total_reward_value : 12343,
            ticket_status_id: 2
     
            
          };
          when(TicketService.updateTickets)
            .calledWith(updateBody)
            .mockReturnValueOnce(Promise.resolve(returnValue));
    
          await TicketController.updateTicketStatus(request, response);
    
          expect(response._getStatusCode()).toEqual(StatusCodes.OK);
        });
        
      });
     
    