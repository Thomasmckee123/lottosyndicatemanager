
import httpMocks, { createResponse, MockResponse } from "node-mocks-http";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { when } from "jest-when";

import { ReviewsService } from '../../services/reviews';
import { ReviewsController } from '../reviews';

jest.mock("@prisma/client");  
jest.mock("../../services/reviews");

describe("getReviewsBySyndicateId", () => {
    it("returns status code `200` and an array of reviews by syndicates", async () => {     
             const returnValue : any = [
                {
                    "id": 1,
                    "createdDate": "2023-07-19T00:00:00.000Z",
                    "title": "Great team!",
                    "content": "The Thunderbolts really know what they're doing!",
                    "users": {
                        "firstName": "John",
                        "lastName": "Doe"
                    },
                    "syndicates": {
                        "name": "The Thunderbolts"
                    }
                }
            ];
      console.log(returnValue)
      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/syndicates/1/reviews",
        params: {
          syndicateId: '1',
      
        }
      });

      const response: MockResponse<Response> = createResponse();

    
      when(ReviewsService.getreviewsBySyndicateId)
        .calledWith(1)
        .mockReturnValueOnce(Promise.resolve(returnValue));
console.log(returnValue)
      await ReviewsController.getReviewsBySyndicateId(request, response);
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
            "createdDate": "2023-07-19T00:00:00.000Z",
            "title": "Great team!",
            "content": "The Thunderbolts really know what they're doing!",
            "users": {
                "firstName": "John",
                "lastName": "Doe"
            },
            "syndicates": {
                "name": "The Thunderbolts"
            }
        }
    ];
     
      when(ReviewsService.getreviewsBySyndicateId)
        .calledWith(NaN);
        //.mockReturnValueOnce(Promise.resolve(returnValue));

      await ReviewsController.getReviewsBySyndicateId(request, response);

      expect(response._getStatusCode()).toEqual(StatusCodes.BAD_REQUEST);
    });
    it("returns status code `500` if an error occurs", async () => {
      const request = httpMocks.createRequest({
        method: "GET",
        url: "/api/syndicates/users/1",
     params:{
        syndicateId: 1
     }
      });
      const response: MockResponse<Response> = createResponse();

      when(ReviewsService.getreviewsBySyndicateId)
        .calledWith(1)
        .mockImplementationOnce(() => {
          throw Error("Error getting client by id");
        });

      await ReviewsController.getReviewsBySyndicateId(request, response);

      expect(response._getStatusCode()).toEqual(
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    });
  });

  //creating a review 
  describe("createreviews", () => {
    const createBody : any = {
        id: 1,
        createdDate: "2023-07-25T10:24:39.694Z",
        title: "name",
        content: "very good stuff",
        users:{ 
    firstName: "Thomas",
    lastName:"McKee",
        },
        syndicates:{
            name: "Thomas Syndicate",
        }
        
    };
  console.log(createBody)
  it("returns status code `200` if user syndicate is successfully created", async () => {
    const request = httpMocks.createRequest({
      method: "POST",
      url: "/api/Syndicate/create",
      body: createBody,
    });
  
    const response: MockResponse<Response> = createResponse();
    const returnValue : any = {
        id: 1,
        createdDate: "2023-07-25T10:24:39.694Z",
        title: "name",
        content: "very good stuff",
        users:{ 
    firstName: "Thomas",
    lastName:"McKee",
        },
        syndicates:{
            name: "Thomas Syndicate",
        }
        
    };
  
    // Here we mock the UserService.createUser function to return a Promise that resolves to returnValue
    ReviewsService.createReviewInSyndicate = jest.fn().mockResolvedValue(returnValue);
  
    await ReviewsController.createNewReviewOnSyndicate(request, response);
  
    expect(response._getStatusCode()).toEqual(StatusCodes.OK);
    expect(response._getJSONData()).toEqual(returnValue);
  });
  
  });
  