import express from "express";
import { BoardsController } from "../controllers/boards";
import { body } from "express-validator";
import { validate } from "../utils/validation";

const BoardsRouter = express.Router();
/**
 * Get all boards.
 * 
 * @return An array of all boards.
 * 
 * @swagger
 * /api/boards:
 *   get:
 *     summary: Get all boards
 *     description: Get all boards.
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
 *                     description: The ID of the board.
 *                   name:
 *                     type: string
 *                     description: The name of the board.
 *                   games:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           description: The ID of the game.
 *                         user_games:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                                 description: The ID of the user game.
 *                               deposit:
 *                                 type: number
 *                                 description: The deposit amount for the user game.
 *                               users:
 *                                 type: object
 *                                 properties:
 *                                   id:
 *                                     type: integer
 *                                     description: The ID of the user.
 *                                   first_name:
 *                                     type: string
 *                                     description: The first name of the user.
 *                                   last_name:
 *                                     type: string
 *                                     description: The last name of the user.
 *                   board_message:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           description: The ID of the board message.
 *                         message:
 *                           type: string
 *                           description: The message content.
 *                         created_date:
 *                           type: string
 *                           format: date-time
 *                           description: The date the message was created.
 *                         board_id:
 *                           type: integer
 *                           description: The ID of the board the message belongs to.
 *                         user_game_id:
 *                           type: integer
 *                           description: The ID of the user game associated with the message.
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
BoardsRouter.get("/", BoardsController.getAllBoards);
/**
 * Get boards by game ID.
 * 
 * @param gameId The ID of the game to get boards for.
 * @return An array of boards for the specified game.
 * 
 * @swagger
 * /api/boards/games/{gameId}:
 *   get:
 *     summary: Get boards by game ID
 *     description: Get boards by game ID.
 *     parameters:
 *       - in: path
 *         name: gameId
 *         description: The ID of the game to get boards for.
 *         required: true
 *         schema:
 *           type: integer
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
 *                     description: The ID of the board.
 *                   name:
 *                     type: string
 *                     description: The name of the board.
 *                   games:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           description: The ID of the game.
 *                         user_games:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                                 description: The ID of the user game.
 *                               deposit:
 *                                 type: number
 *                                 description: The deposit amount for the user game.
 *                               users:
 *                                 type: object
 *                                 properties:
 *                                   id:
 *                                     type: integer
 *                                     description: The ID of the user.
 *                                   first_name:
 *                                     type: string
 *                                     description: The first name of the user.
 *                                   last_name:
 *                                     type: string
 *                                     description: The last name of the user.
 *                   board_message:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           description: The ID of the board message.
 *                         message:
 *                           type: string
 *                           description: The message content.
 *                         created_date:
 *                           type: string
 *                           format: date-time
 *                           description: The date the message was created.
 *                         board_id:
 *                           type: integer
 *                           description: The ID of the board the message belongs to.
 *                         user_games:
 *                           type: object
 *                           properties:
 *                             users:
 *                               type: object
 *                               properties:
 *                                 first_name:
 *                                   type: string
 *                                   description: The first name of the user.
 *                                 last_name:
 *                                   type: string
 *                                   description: The last name of the user.
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
BoardsRouter.get("/games/:gameId(\\d+)",BoardsController.getBoardsByGameId);
/**
 * Create a new board.
 * 
 * @param board An object containing the name and game ID of the new board.
 * @return The name of the new board.
 * 
 * @swagger
 * /api/boards/games/{gameId}:
 *   post:
 *     summary: Create a new board
 *     description: Create a new board.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the new board.
 *               gameId:
 *                 type: integer
 *                 description: The ID of the game the new board belongs to.
 *             required:
 *               - name
 *               - gameId
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: The name of the new board.
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
BoardsRouter.post("/games/:gameId", [
    body("name").isString().isLength( {min:3} ),
  ], validate,
  BoardsController.createBoard);
  /**
 * Delete a board by ID.
 * 
 * @param boardId The ID of the board to delete.
 * @return The deleted board.
 * 
 * @swagger
 * /boards/{boardId}:
 *   delete:
 *     summary: Delete a board by ID
 *     description: Delete a board by ID.
 *     parameters:
 *       - in: path
 *         name: boardId
 *         description: The ID of the board to delete.
 *         required: true
 *         schema:
 *           type: integer
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
 *                   description: The ID of the deleted board.
 *                 name:
 *                   type: string
 *                   description: The name of the deleted board.
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
BoardsRouter.delete(
"/delete/:boardId(\\d+)",BoardsController.deleteBoardById);
/**
 * Update a board.
 * 
 * @param board An object containing the ID and new name of the board to update.
 * @return The updated board.
 * 
 * @swagger
 * /api/boards/{boardId}:
 *   put:
 *     summary: Update a board
 *     description: Update a board.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: The ID of the board to update.
 *               name:
 *                 type: string
 *                 description: The new name of the board.
 *             required:
 *               - id
 *               - name
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
 *                   description: The ID of the updated board.
 *                 name:
 *                   type: string
 *                   description: The new name of the board.
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
BoardsRouter.put("/:boardId(\\d+)", BoardsController.UpdateBoards);
export { BoardsRouter }; 