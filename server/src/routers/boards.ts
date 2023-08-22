import express from "express";
import { BoardsController } from "../controllers/boards";
import { body } from "express-validator";
import { validate } from "../utils/validation";

const BoardsRouter = express.Router();

BoardsRouter.get("/"/**
* @swagger
* /api/boards:
*   get:
*     summary: Retrieve all boards.
*     description: Retrieves a boards object array.
*     tags:
*      - boards
*     responses:
*       200:
*         description: A valid array of boards objects.
*         content:
*           application/json:
*             schema:
*               type: array
*/, BoardsController.getAllBoards);
BoardsRouter.get(/**
* @swagger
* /api/boards/syndicate/{syndicateId}:
*   get:
*     summary: Retrieve all Message on a particular syndicate.
*     description: boardsbased on the syndicate.
*     tags:
*      - boards
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
*/"/games/:gameId(\\d+)",BoardsController.getBoardsByGameId);
BoardsRouter.post(/**
* @swagger
* api/boards/create:
*   post:
*     summary: Create a new board.
*     description: Creates a new board object.
*     tags:
*      - create
*      - board
*     parameters:
*       - in: body
*         name: boardDetails
*         required: true
*         description: board details for signing up.
*         schema:
*           type: object
*           items:
*             name:
*              type: string
*              description: The user's name.
*              example: John Graham
*             syndicate_id: 
*              type: number
*              description: The syndicate_id
*              example: 1
*         
*     responses:
*       201:
*         description: Created a new user.
*         content:
*           application/json:
*             schema:
*               type: array
*               
*/"/games/:gameId", [
    body("name").isString().isLength( {min:3} ),
  ], validate,
  BoardsController.createBoard);
BoardsRouter.delete(/**
* @swagger
* /api/boards/delete/{boardId}:
*   delete:
*     tags: 
*     summary: Deletes an existing board
*     description: deletes a board object.
*       -boards
*     parameters:
*       - in: path
*         name: boardId
*         type: integer
*         description: The ID of the board.
*     responses:
*       400:
*         description: Bad Request - required values are missing.
*       204:
*         description:board Deleted
*/
"/delete/:boardId(\\d+)",BoardsController.deleteBoardById);
BoardsRouter.put(/**
* @swagger
* /api/boards/update/{id}:
*   put:
*     tags: 
*       - boards
*     summary: Updates an existing board
*     parameters:
*       - in: path 
*         name: id
*         schema:
*           type: integer
*         description: The id of the requested game.
*       - in: body
*         name: updateBoards
*         description: "board details to update"
*         schema:
*           type: object
*           properties:
*            name:
*             type: string
*             required: false
*             description: update board name
*             example: new board
*     responses:
*       400:
*         description: Bad Request - required values are missing.
*       200:
*         description: User Updated
*/"/:boardId(\\d+)", BoardsController.UpdateBoards);
export { BoardsRouter }; 