import { prismaAsAny } from '../../test-utils/prisma';
import { prisma } from '../../utils/prisma';

import httpMocks, { createResponse, MockResponse } from "node-mocks-http";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { when } from "jest-when";

import { MessageService } from '../../services/messages';

import { MessagesController } from '../messages';
import { GameService } from '../../services/games';
import { GameController } from '../games';

jest.mock("@prisma/client");  
jest.mock("../../services/games");
describe("GET /games", () => {
    test("returns status code `200` and an array of games", async () => {
        const request = httpMocks.createRequest({
          method: "GET",
          url: "/api/games/",
        });
        const response: MockResponse<Response> = createResponse();
        const returnValue : any = [{
            name: "Thomas",
            draw_date:"2023-07-25T10:24:39.694Z",
            reward: 12,
            required_ticket_number: "2",
            user_syndicates: {
              start_date: "2023-07-25T10:24:39.694Z",
              users: {
                id: 1,
                first_name: "Thomas",
                last_name: "McKee",
                email: "ThomasMckee@Gmail.com",
              },
              syndicates: {
                id: 1,
                created_date: "2023-07-25T10:24:39.694Z",
                name: "Thomas",
                description:"awesome",
                avatar: "String.png",
              },
            }}];
        when(GameService.getAll)
          .calledWith()
          .mockReturnValueOnce(Promise.resolve(returnValue));
  
        await GameController.getAllGames(request, response)
  
        expect(response._getStatusCode()).toEqual(StatusCodes.OK);
        expect(response._getJSONData()[0]).toEqual(returnValue[0]);
      });
    });
