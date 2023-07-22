import express from "express";
import { GameController } from "../controllers/games";
import { body } from "express-validator";
import { resolver } from "../middleware/_resolver";

const GamesRouter = express.Router();

GamesRouter.get("/"/**
* @swagger
* /api/games:
*   get:
*     summary: Retrieve all games.
*     description: Retrieves a game object array.
*     tags:
*      - games
*     responses:
*       200:
*         description: A valid array of syndicates object.
*         content:
*           application/json:
*             schema:
*               type: array
*/, GameController.getAllGames);
GamesRouter.post(/**
* @swagger
* api/games/create/syndicates/{id}:
*   post:
*     summary: Create a new game.
*     description: Creates a new game object.
*     tags:
*      - create
*     parameters:
*      - in: path
*        name: syndicateId
*        description: ID of the syndicate to create a review.
*        required: true
*        schema:
*          type: integer
*      - in: body
*        name: gameDetails
*        required: true
*        description: User details for signing up.
*        schema:
*          type: object
*          properties:
*            name: 
*              type: string
*              description: The user's name.
*              example: John Graham
*            draw_date:
*              type: date
*              description: draw date.
*            required_ticket_number:
*              type: number
*              description: the ticket number.
*              example: 2
*     responses:
*       201:
*         description: Created a new user.
*         content:
*           application/json:
*             schema:
*               type: array
*/
"/create/syndicates/:id(\\d+)", [
    body("name").isString(),
    body("draw_date").isDate().isLength({ min: 3 }).trim(),
    body("reward").isNumeric().trim(),
    body("required_ticket_number").isNumeric().isLength({ min:1} ).trim(),
  ], resolver,GameController.createGames);
GamesRouter.put( /**
* @swagger
* /api/games/update/{id}:
*   put:
*     tags: 
*       - games
*     summary: Updates an existing game
*     parameters:
*       - in: path 
*         name: id
*         schema:
*           type: integer
*         description: The id of the requested game.
*       - in: body
*         name: updateGames
*         description: "game details to update"
*         schema:
*           type: object
*           properties:
*            name:
*             type: string
*             required: false
*             description: update total reward
*             example: euromillions
*            draw_date:
*             type: date
*             required: false
*             description: update the date
*             example: 2020:01:02
*            reward:
*             type: integer
*             description: the total reward
*             example: 343234
*            required_ticket_number:
*             type: integer
*             description: required ticket number
*             example: 5
*     responses:
*       400:
*         description: Bad Request - required values are missing.
*       200:
*         description: User Updated
*/"/update/:id(\\d+)", [
    body("name").isString(),
    body("draw_date").isDate(),
    body("reward").isNumeric().trim(),
    body("required_ticket_number").isNumeric().isLength({ min:1} ).trim(),
  ], resolver, GameController.UpdateGame);
GamesRouter.delete(/**
* @swagger
* /api/boards/delete/{boardId}:
*   delete:
*     tags: 
*     summary: Deletes an existing game
*     description: deletes a game object.
*       -games
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
"/delete/:gameId(\\d+)",GameController.deleteGameById);
export { GamesRouter }; 