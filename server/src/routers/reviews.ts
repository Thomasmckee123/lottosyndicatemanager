import express from "express";
import { ReviewsController } from "../controllers/reviews";
import { body } from "express-validator";
import { validate } from "../utils/validation";

const ReviewsRouter = express.Router();
ReviewsRouter.get(/**
* @swagger
* /api/reviews/syndicates/{id}:
*   get:
*     summary: Retrieve all reviews on a particular syndicate.
*     description: reviews based on the syndicate.
*     tags:
*      - reviews
*      - syndicates
*     parameters:
*       - in: path
*         name: id
*         required: true
*         description: Numeric ID of the syndicate to retrieve.
*         schema:
*           type: integer
*     responses:
*       200:
*         description: A valid ticket object.
*         content:
*           application/json:
*             schema:
*               type: array
*               
*/"/syndicates/:syndicateId(\\d+)",ReviewsController.getReviewsBySyndicateId)
ReviewsRouter.post(/**
* @swagger
* /api/reviews/create/syndicates/{syndicateId}/users/{userId}:
*   post:
*     summary: Create a new review.
*     description: Creates a new review object.
*     tags:
*       - syndicates
*       - users
*     parameters: 
*      -  in: path
*         name: syndicateId
*         description: ID of the syndicate to create a review.
*         required: true
*         schema:
*           type: integer
*      -  in: path
*         name: userId
*         required: true
*         schema:
*           type: integer
*         description: ID of the user who created the review.
*      - in: body
*        name: reviewDetails
*        required: true
*        description: review details
*        schema: 
*           type: object
*        properties:  
*                created_date:
*                 type: date
*                 description: date created
*                 example: 2020/12/20
*                title:
*                 type: string
*                 description: title of review
*                 example: "too good"
*                content: 
*                 type: string
*                 description: content id    
*     responses:
*       201:
*         description: Created a new review.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 id:
*                   type: number
*                 created_date:
*                   type: string
*                 format: date-time
*                 title:
*                   type: string
*                 content:
*                   type: string
*                 userId:
*                   type: number
*                 syndicateId:
*                   type: number
*/
 "/syndicates/:syndicateId(\\d+)/users/:userId(\\d+)",[
    body("title").isString().isLength({ min: 3 }).trim(),
    body("content").isString().isLength({min: 3, max:2000}).trim(),
  ], validate, ReviewsController.createNewReviewOnSyndicate);

ReviewsRouter.delete(/**
* @swagger
* /api/reviews/delete/{reviewId}:
*   delete:
*     tags: 
*     summary: Deletes an existing review
*     description: Creates a new review object.
*       -reviews
*     
*     parameters:
*       - in: path
*         name: reviewId
*         type: integer
*         description: The ID of the review.
*     responses:
*       400:
*         description: Bad Request - required values are missing.
*       204:
*         description: Review Deleted
*/
"/delete/:reviewId(\\d+)",ReviewsController.deleteReviewById);
export { ReviewsRouter }; 