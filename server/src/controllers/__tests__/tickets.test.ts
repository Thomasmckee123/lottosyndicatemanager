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
        const returnValue = 
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

    