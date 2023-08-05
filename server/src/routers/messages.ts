import express from "express";
import { MessagesController } from "../controllers/messages";
import { resolver } from "../middleware/_resolver";
import { body } from "express-validator";

const MessagesRouter = express.Router();
MessagesRouter.get("/"/**
* @swagger
* /api/messages:
*   get:
*     summary: Retrieve all messages.
*     description: Retrieves a message object array.
*     tags:
*      - messages
*     responses:
*       200:
*         description: A valid array of syndicates object.
*         content:
*           application/json:
*             schema:
*               type: array
*              
*/,MessagesController.getAllMessages)
MessagesRouter.get(/**
* @swagger
* /api/messages/board/{id}:
*   get:
*     summary: Retrieve all Message on a particular board.
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
*/"/board/:boardId(\\d+)", MessagesController.getMessagesByBoardsId);

MessagesRouter.post(/**
* @swagger
* /api/messages/create/syndicates/{syndicateId}/boards/{boardId}:
*   post:
*     summary: Create a new message.
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
*         name: boardId
*         required: true
*         schema:
*           type: integer
*         description: ID of the board where the mesage is posted
*      - in: body
*        name: messageDetails
*        required: true
*        description: review details
*        schema: 
*           type: object
*        properties:  
*                message:
*                 type: string
*                 description: message
*                 example: "hi"
*                created_date:
*                 type: date
*                 description: date of review
*                 example: 2022/10/2
*    
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
*/"/syndicates/:user_syndicate_id(\\d+)/boards/:boardId(\\d+)",[
    body("message").isString().isLength({min:3, max: 2000}),
    body("created_date").isDate(),
  ],resolver, MessagesController.createNewMessageInBoard);
MessagesRouter.put("/delete/:messageId(\\d+)", MessagesController.deleteMessageById);
export { MessagesRouter }; 