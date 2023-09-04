import express from "express";
import { MessagesController } from "../controllers/messages";
import { body } from "express-validator";
import { validate } from "../utils/validation";

const MessagesRouter = express.Router();
/**
 * Get all messages.
 * 
 * @return An array of all messages.
 * 
 * @swagger
 * /api/messages:
 *   get:
 *     summary: Get all messages
 *     description: Get all messages.
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
 *                     description: The ID of the message.
 *                   message:
 *                     type: string
 *                     description: The content of the message.
 *                   createdDate:
 *                     type: string
 *                     format: date-time
 *                     description: The date the message was created.
 *                   boards:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The ID of the board the message is on.
 *                       name:
 *                         type: string
 *                         description: The name of the board the message is on.
 *                   userGames:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The ID of the user game the message is associated with.
 *                       deposit:
 *                         type: number
 *                         description: The deposit amount for the user game the message is associated with.
 *                       users:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             description: The ID of the user who wrote the message.
 *                           firstName:
 *                             type: string
 *                             description: The first name of the user who wrote the message.
 *                           lastName:
 *                             type: string
 *                             description: The last name of the user who wrote the message.
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
MessagesRouter.get("/",MessagesController.getAllMessages)
/**
 * Get messages by board ID.
 * 
 * @param boardsId The ID of the board to get messages for.
 * @return An array of messages for the specified board.
 * 
 * @swagger
 * /api/messages/boards/{boardsId}:
 *   get:
 *     summary: Get messages by board ID
 *     description: Get messages by board ID.
 *     parameters:
 *       - in: path
 *         name: boardsId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the board to get messages for.
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
 *                     description: The ID of the message.
 *                   message:
 *                     type: string
 *                     description: The content of the message.
 *                   createdDate:
 *                     type: string
 *                     format: date-time
 *                     description: The date the message was created.
 *                   boards:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The ID of the board the message is on.
 *                       name:
 *                         type: string
 *                         description: The name of the board the message is on.
 *                   userGames:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The ID of the user game the message is associated with.
 *                       deposit:
 *                         type: number
 *                         description: The deposit amount for the user game the message is associated with.
 *                       users:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             description: The ID of the user who wrote the message.
 *                           firstName:
 *                             type: string
 *                             description: The first name of the user who wrote the message.
 *                           lastName:
 *                             type: string
 *                             description: The last name of the user who wrote the message.
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
MessagesRouter.get("/boards/:boardId(\\d+)", MessagesController.getMessagesByBoardsId);
/**
 * Create a new message in a board.
 * 
 * @param message The message to create.
 * @return The date the message was created.
 * 
 * @swagger
 * /api/messages/games/{userGameId}/boards/{boardId}:
 *   post:
 *     summary: Create a new message in a board
 *     description: Create a new message in a board.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 description: The content of the message.
 *               createdDate:
 *                 type: string
 *                 format: date-time
 *                 description: The date the message was created.
 *               boardId:
 *                 type: integer
 *                 description: The ID of the board to create the message in.
 *               userGameId:
 *                 type: integer
 *                 description: The ID of the user game the message is associated with.
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
 *                   description: The date the message was created.
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
MessagesRouter.post("/games/:userGameId(\\d+)/boards/:boardId",[
    body("message").isString().isLength({min:1, max: 200}),
  ],validate, MessagesController.createNewMessageInBoard);
  /**
 * Delete a message by ID.
 * 
 * @param messageId The ID of the message to delete.
 * @return The deleted message.
 * 
 * @swagger
 * /api/messages/{messageId}:
 *   delete:
 *     summary: Delete a message by ID
 *     description: Delete a message by ID.
 *     parameters:
 *       - in: path
 *         name: messageId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the message to delete.
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
 *                   description: The ID of the deleted message.
 *                 message:
 *                   type: string
 *                   description: The content of the deleted message.
 *                 createdDate:
 *                   type: string
 *                   format: date-time
 *                   description: The date the message was deleted.
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
MessagesRouter.put("/delete/:messageId(\\d+)", MessagesController.deleteMessageById);

export { MessagesRouter }; 