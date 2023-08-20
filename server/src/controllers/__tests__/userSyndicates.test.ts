
import { UserService } from  '../../services/users';
import httpMocks, { createResponse, MockResponse } from "node-mocks-http";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { when } from "jest-when";
import { UserController } from '../users';
import { UserSyndicateService } from '../../services/userSyndicates';
import { IUser, IUserSyndicate } from '../../interfaces';
import { UserSyndicateController } from '../userSyndicate';

describe("getUserSyndicateById", () => {
    it("returns status code `200` and a userSyndicate", async () => {
      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/userSyndicates/syndicates/1",
        params: {
          syndicateId: 1,
        },
      });
      const response: MockResponse<Response> = createResponse();
      const returnValue :any = [
        {
            "id": 1,
            "startDate": "2023-07-13T00:00:00.000Z",
            "users": {
                "id": 1,
                "firstName": "John",
                "lastName": "Doe",
                "email": "JohnDoe@Gmail.com"
            },
            "syndicates": {
                "id": 1,
                "createdDate":"2023-07-10T00:00:00.000Z",
                "name": "The Thunderbolts",
                "description": "For those who strike like lightning!",
                "avatar": "thunderbolts.jpg"
            },
            "roles": {
                "name": "Leader"
            }
        }
    ]
    const returnValueResult :any[] = [
        {
            "id": 1,
            "startDate": "2023-07-13T00:00:00.000Z",
            "users": {
                "id": 1,
                "firstName": "John",
                "lastName": "Doe",
                "email": "JohnDoe@Gmail.com"
            },
            "syndicates": {
                "id": 1,
                "createdDate":"2023-07-10T00:00:00.000Z" ,
                "name": "The Thunderbolts",
                "description": "For those who strike like lightning!",
                "avatar": "thunderbolts.jpg"
            },
            "roles": {
                "name": "Leader"
            }
        }
    ]
      when(UserSyndicateService.getUserSyndicateBySyndicateId = jest.fn().mockResolvedValue(returnValue))
        .calledWith(1)
        .mockReturnValueOnce(Promise.resolve(returnValue));

      await UserSyndicateController.getUserSyndicateById(request, response);

      expect(response._getStatusCode()).toEqual(StatusCodes.OK);
      expect(response._getJSONData()).toEqual(returnValueResult);
    });
    const returnWrongValueResult :any = null

it("returns status code `404` if an error occurs", async () => {
    const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/userSyndicates/syndicates/1",
        params: {
            userId: 1,
        },
    });

    const response: MockResponse<Response> = createResponse();

    UserSyndicateService.getUserSyndicateBySyndicateId = jest.fn().mockReturnValue(null);

    await UserSyndicateController.getUserSyndicateById(request, response);

    expect(response._getStatusCode()).toEqual(StatusCodes.NOT_FOUND);
});

   //testing making user syndicate
   describe("createUserSyndicate", () => {
    const createBody = {
     startDate: new Date(),
     userId: 1,
     userSyndicateId: 1,
     roleId: 1
    };
   
    it("returns status code `200` if user syndciate is successfully created", async () => {
      const request = httpMocks.createRequest({
        method: "POST",
        url: "/1/syndicates/1",
        body: createBody,
      });
      const response: MockResponse<Response> = createResponse();
      const returnValue = {
        startDate: new Date(),

        roleId: 9999
      };
      when(UserSyndicateService.createUserSyndicate  =jest.fn().mockResolvedValue(returnValue))
        .calledWith(createBody)
        .mockReturnValueOnce(Promise.resolve(new Date()));

      await UserSyndicateController.createUserSyndicate(request, response);

      expect(response._getStatusCode()).toEqual(StatusCodes.OK);
    });
});
  });
  describe("getSyndicatesById", () => {
    it("returns status code `200` and an array of syndicates", async () => {     
             const returnValue : any = [
                {
                    "id": 1,
                    "startDate": "2023-07-13T00:00:00.000Z",
                    "users": {
                        "id": 1,
                        "firstName": "John",
                        "lastName": "Doe",
                        "email": "JohnDoe@Gmail.com"
                    },
                    "syndicates": {
                        "id": 1,
                        "createdDate": "2023-07-10T00:00:00.000Z",
                        "name": "The Thunderbolts",
                        "description": "For those who strike like lightning!",
                        "avatar": "thunderbolts.jpg"
                    },
                    "roles": {
                        "name": "Leader"
                    }
                }
            ];
      console.log(returnValue)
      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/syndicates/1/games/1",
        params: {
          userId: '1',
      
        }
      });

      const response: MockResponse<Response> = createResponse();

    
      when(UserSyndicateService.getSyndicatesByUserId =jest.fn().mockResolvedValue(returnValue))
        .calledWith(1)
        .mockReturnValueOnce(Promise.resolve(returnValue));
console.log(returnValue)
      await UserSyndicateController.getSyndicatesByUserId(request, response);
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
      const returnValue : any[] = [
        {
            "id": 1,
            "startDate": "2023-07-13T00:00:00.000Z",
            "users": {
                "id": 1,
                "firstName": "John",
                "lastName": "Doe",
                "email": "JohnDoe@Gmail.com"
            },
            "syndicates": {
                "id": 1,
                "createdDate": "2023-07-10T00:00:00.000Z",
                "name": "The Thunderbolts",
                "description": "For those who strike like lightning!",
                "avatar": "thunderbolts.jpg"
            },
            "roles": {
                "name": "Leader"
            }
        }
    ];
     
      when(UserSyndicateService.getSyndicatesByUserId =jest.fn().mockResolvedValue(returnValue))
        .calledWith(NaN);
        //.mockReturnValueOnce(Promise.resolve(returnValue));

      await UserSyndicateController.getSyndicatesByUserId(request, response);

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

      when(UserSyndicateService.getSyndicatesByUserId =jest.fn().mockResolvedValue(null))
        .calledWith(1)
        .mockImplementationOnce(() => {
          throw Error("Error getting client by id");
        });

      await UserSyndicateController.getSyndicatesByUserId(request, response);

      expect(response._getStatusCode()).toEqual(
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    });
  });
