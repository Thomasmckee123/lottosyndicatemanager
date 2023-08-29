import express from "express";
import { ReviewsController } from "../controllers/reviews";
import { body } from "express-validator";
import { validate } from "../utils/validation";

const ReviewsRouter = express.Router();
/**
 * Get reviews by syndicate ID.
 * 
 * @param syndicateId The ID of the syndicate to get reviews for.
 * @return An array of reviews for the specified syndicate.
 * 
 * @swagger
 * /api/reviews/syndicates/{syndicateId}:
 *   get:
 *     summary: Get reviews by syndicate ID
 *     description: Get reviews by syndicate ID.
 *     parameters:
 *       - in: path
 *         name: syndicateId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the syndicate to get reviews for.
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The ID of the review.
 *                   createdDate:
 *                     type: string
 *                     format: date-time
 *                     description: The date the review was created.
 *                   title:
 *                     type: string
 *                     description: The title of the review.
 *                   content:
 *                     type: string
 *                     description: The content of the review.
 *                   users:
 *                     type: object
 *                     properties:
 *                       firstName:
 *                         type: string
 *                         description: The first name of the user who wrote the review.
 *                       lastName:
 *                         type: string
 *                         description: The last name of the user who wrote the review.
 *                   syndicates:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         description: The name of the syndicate the review is for.
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message
 */
ReviewsRouter.get("/syndicates/:syndicateId(\\d+)",ReviewsController.getReviewsBySyndicateId)
/**
 * Create a new review in a syndicate.
 * 
 * @param review An object containing the details of the review to create.
 * @return The date the review was created.
 * 
 * @swagger
 * /api/reviews/syndicates/{syndicateId}/users/{userId}:
 *   post:
 *     summary: Create a new review in a syndicate
 *     description: Create a new review in a syndicate.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the review.
 *               content:
 *                 type: string
 *                 description: The content of the review.
 *               userId:
 *                 type: integer
 *                 description: The ID of the user who wrote the review.
 *               syndicateId:
 *                 type: integer
 *                 description: The ID of the syndicate the review is for.
 *             required:
 *               - title
 *               - content
 *               - userId
 *               - syndicateId
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 createdDate:
 *                   type: string
 *                   format: date-time
 *                   description: The date the review was created.
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message
 */
ReviewsRouter.post(
 "/syndicates/:syndicateId(\\d+)/users/:userId(\\d+)",[
    body("title").isString().isLength({ min: 3 }).trim(),
    body("content").isString().isLength({min: 3, max:2000}).trim(),
  ], validate, ReviewsController.createNewReviewOnSyndicate);
/**
 * Delete a review by ID.
 * 
 * @param reviewId The ID of the review to delete.
 * @return The deleted review.
 * 
 * @swagger
 * /api/reviews/delete/{reviewId}:
 *   delete:
 *     summary: Delete a review by ID
 *     description: Delete a review by ID.
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the review to delete.
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The ID of the deleted review.
 *                 createdDate:
 *                   type: string
 *                   format: date-time
 *                   description: The date the review was created.
 *                 title:
 *                   type: string
 *                   description: The title of the review.
 *                 content:
 *                   type: string
 *                   description: The content of the review.
 *                 users:
 *                   type: object
 *                   properties:
 *                     firstName:
 *                       type: string
 *                       description: The first name of the user who wrote the review.
 *                     lastName:
 *                       type: string
 *                       description: The last name of the user who wrote the review.
 *                 syndicates:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: The name of the syndicate the review is for.
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message
 */
ReviewsRouter.delete("/delete/:reviewId(\\d+)",ReviewsController.deleteReviewById);
export { ReviewsRouter }; 