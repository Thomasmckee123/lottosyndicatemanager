import { prismaAsAny } from '../../test-utils/prisma';
import { prisma } from '../../utils/prisma';
import { UserService } from  '../../services/users';
import httpMocks, { createResponse, MockResponse } from "node-mocks-http";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { when } from "jest-when";
import { UserController } from '../users';
import { error } from 'console';
import { TicketService } from '../../services/tickets';
import { TicketController } from '../tickets';
import { ITicket } from '../../interfaces';

jest.mock("@prisma/client");  
jest.mock("../../services/tickets");
const testTicket = [{
    id: 1,
    ticket_code: "NA86YWD",
    total_reward_value: 12342,
    ticket_status: {
      id: 1,
      name: "Thomas",
    },
    user_syndicates: {
      id: 2,
      users: {
        id: 2,
        first_name: "Thomas",
        last_name: "McKee",
      },
    },
    game_id: 1,}
];
describe("GET /tickets", () => {
    test("returns status code `200` and an array of tickets", async () => {
        const request = httpMocks.createRequest({
          method: "GET",
          url: "/api/tickets/",
        });
        const response: MockResponse<Response> = createResponse();
        const returnValue :ITicket[] = 
        [  {
            id: 1,
            ticket_code: "NA86YWD",
            total_reward_value: 12342,
            ticket_status: {
              id: 1,
              name: "Thomas",
            },
            user_syndicates: {
              id: 2,
              users: {
                id: 2,
                first_name: "Thomas",
                last_name: "McKee",
              },
            },
            game_id: 1
        
        }];
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
                 const returnValue  = [{
              id: 1,
              ticket_code: "NA86YWD",
              total_reward_value: 12342,
              ticket_status: {
                id: 1,
                name: "Thomas",
              },
              user_syndicates: {
                id: 1,
                users: {
                  id: 2,
                  first_name: "Thomas",
                  last_name: "McKee",
                }
              },
              game_id: 1
          
          }];
          console.log(returnValue)
          const request = httpMocks.createRequest({
            method: "GET",
            url: "/api/syndicates/1/games/1",
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
          const returnValue : ITicket[] = [{
                id: 1,
                ticket_code: "NA86YWD",
                total_reward_value: 12342,
                ticket_status: {
                  id: 1,
                  name: "Thomas",
                },
                user_syndicates: {
                  id: 1,
                  users: {
                    id: 1,
                    first_name: "Thomas",
                    last_name: "McKee",
                  },
                },
                game_id: 1,
          }];
         
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
      