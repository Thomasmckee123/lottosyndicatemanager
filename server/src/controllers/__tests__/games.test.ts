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
        const returnValue : any[] = [
            {
                "id": 1,
                "maximumPlayers": 5,
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
                    },
                    "syndicates": {
                        "id": 1,
                        "createdDate": "2023-07-10T00:00:00.000Z",
                        "name": "The Thunderbolts",
                        "description": "For those who strike like lightning!",
                        "avatar": "thunderbolts.jpg"
                    }
                }
            },];
        when(GameService.getAll)
          .calledWith()
          .mockReturnValueOnce(Promise.resolve(returnValue));
  
        await GameController.getAllGames(request, response)
  
        expect(response._getStatusCode()).toEqual(StatusCodes.OK);
        expect(response._getJSONData()[0]).toEqual(returnValue[0]);
      });
    });