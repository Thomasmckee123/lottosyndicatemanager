
import httpMocks, { createResponse, MockResponse } from "node-mocks-http";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { when } from "jest-when";

import { MessageService } from '../../services/messages';

import { MessagesController } from '../messages';

jest.mock("@prisma/client");  
jest.mock("../../services/messages");
describe("GET /messages", () => {
    test("returns status code `200` and an array of games", async () => {
        const request = httpMocks.createRequest({
          method: "GET",
          url: "/api/messages/",
        });
        const response: MockResponse<Response> = createResponse();
        const returnValue : any[] = [
            {
                "id": 2,
                "message": "We move silently, we win always.",
                "createdDate": "2023-07-23T00:00:00.000Z",
                "boards": {
                    "id": 2,
                    "name": "Shadows Speak"
                },
                "userGames": {
                    "id": 1,
                    "deposit": 0,
                    "users": {
                        "id": 1,
                        "firstName": "John",
                        "lastName": "Doe"
                    }
                }
            } ];
        when(MessageService.getAll)
          .calledWith()
          .mockReturnValueOnce(Promise.resolve(returnValue));
  
        await MessagesController.getAllMessages(request, response)
  
        expect(response._getStatusCode()).toEqual(StatusCodes.OK);
        expect(response._getJSONData()[0]).toEqual(returnValue[0]);
      });
    });

describe("getReviewsByBoardsId", () => {
    it("returns status code `200` and an array of reviews by syndicates", async () => {     
             const returnValue : any = [
                {
                    "id": 2,
                    "message": "We move silently, we win always.",
                    "createdDate": "2023-07-23T00:00:00.000Z",
                    "boards": {
                        "id": 2,
                        "name": "Shadows Speak"
                    },
                    "userGames": {
                        "id": 1,
                        "deposit": 0,
                        "users": {
                            "id": 1,
                            "firstName": "John",
                            "lastName": "Doe"
                        }
                    }
                }];
      console.log(returnValue)
      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/boards/1/messages",
        params: {
          boardId: '1',
      
        }
      });

      const response: MockResponse<Response> = createResponse();

    
      when(MessageService.getMessagesByBoardsId)
        .calledWith(1)
        .mockReturnValueOnce(Promise.resolve(returnValue));
console.log(returnValue)
      await MessagesController.getMessagesByBoardsId(request, response);
console.log(response)
      expect(response._getStatusCode()).toEqual(StatusCodes.OK);
      expect(response._getJSONData()).toEqual(returnValue);
    });
    it("returns status code `400` if invalid userId", async () => {
      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/boards/NaN/messages",
        params: {
          boardId: NaN,
        },
      });
      const response: MockResponse<Response> = createResponse();
   
     
      when(MessageService.getMessagesByBoardsId)
        .calledWith(NaN);
        //.mockReturnValueOnce(Promise.resolve(returnValue));

      await MessagesController.getMessagesByBoardsId(request, response);

      expect(response._getStatusCode()).toEqual(StatusCodes.BAD_REQUEST);
    });
    it("returns status code `500` if an error occurs", async () => {
      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/messages/boards/1",
     params:{
        boardId: 1
     }
      });
      const response: MockResponse<Response> = createResponse();

      when(MessageService.getMessagesByBoardsId)
        .calledWith(1)
        .mockImplementationOnce(() => {
          throw Error("Error getting client by id");
        });

      await MessagesController.getMessagesByBoardsId(request, response);

      expect(response._getStatusCode()).toEqual(
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    });
  });

  //creating a message

  //creating a review 
  describe("createreviews", () => {
    const createBody : any = [
        {
            "id": 2,
            "message": "We move silently, we win always.",
            "createdDate": "2023-07-23T00:00:00.000Z",
            "boards": {
                "id": 2,
                "name": "Shadows Speak"
            },
            "userGames": {
                "id": 1,
                "deposit": 0,
                "users": {
                    "id": 1,
                    "firstName": "John",
                    "lastName": "Doe"
                }
            }
        }];
  console.log(createBody)
  it("returns status code `200` if message is successfully created", async () => {
    const request = httpMocks.createRequest({
      method: "POST",
      url: "/api/messages/create",
      body: createBody,
    });
  
    const response: MockResponse<Response> = createResponse();
    const returnValue : any = [
        {
            "id": 2,
            "message": "We move silently, we win always.",
            "createdDate": "2023-07-23T00:00:00.000Z",
            "boards": {
                "id": 2,
                "name": "Shadows Speak"
            },
            "userGames": {
                "id": 1,
                "deposit": 0,
                "users": {
                    "id": 1,
                    "firstName": "John",
                    "lastName": "Doe"
                }
            }
        }];
  
    MessageService.createMessageInBoard = jest.fn().mockResolvedValue(returnValue);
  
    await MessagesController.createNewMessageInBoard(request, response);
  
    expect(response._getStatusCode()).toEqual(StatusCodes.OK);
    expect(response._getJSONData()).toEqual(returnValue);
  });
  
  });