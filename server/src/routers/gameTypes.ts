import express from "express";
import { body } from "express-validator";
import GameTypesController from "../controllers/gameTypes";
import { validate } from "../utils/validation";
const GameTypesRouter = express.Router();

/**
 * Get all game types.
 * 
 * @return An array of all game types.
 * 
 * @swagger
 * /api/gameTypes:
 *   get:
 *     summary: Get all game types
 *     description: Get all game types.
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
 *                     description: The ID of the game type.
 *                   name:
 *                     type: string
 *                     description: The name of the game type.
 *                   drawDate:
 *                     type: string
 *                     format: date-time
 *                     description: The date of the next draw for the game type.
 *                   reward:
 *                     type: number
 *                     description: The reward amount for the game type.
 *                   image:
 *                     type: string
 *                     description: The URL of the image for the game type.
 *                   ticketCost:
 *                     type: number
 *                     description: The cost of a ticket for the game type.
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
GameTypesRouter.get('/', GameTypesController.getAllGameTypes)
/**
 * Get a game type by ID.
 * 
 * @param gameTypeId The ID of the game type to retrieve.
 * @return The game type with the specified ID.
 * 
 * @swagger
 * /gameTypes/{gameTypeId}:
 *   get:
 *     summary: Get a game type by ID
 *     description: Get a game type by ID.
 *     parameters:
 *       - in: path
 *         name: gameTypeId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the game type to retrieve.
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
 *                   description: The ID of the game type.
 *                 name:
 *                   type: string
 *                   description: The name of the game type.
 *                 drawDate:
 *                   type: string
 *                   format: date-time
 *                   description: The date of the next draw for the game type.
 *                 reward:
 *                   type: number
 *                   description: The reward amount for the game type.
 *                 image:
 *                   type: string
 *                   description: The URL of the image for the game type.
 *                 ticketCost:
 *                   type: number
 *                   description: The cost of a ticket for the game type.
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
GameTypesRouter.get('/:gameTypeId',GameTypesController.getGameTypesById);
/**
 * Update the draw date for a game type.
 * 
 * @param gameTypes An object containing the ID of the game type to update and the new draw date.
 * @return The updated game type.
 * 
 * @swagger
 * /game-types/{gameTypeId}/draw-date:
 *   put:
 *     summary: Update the draw date for a game type
 *     description: Update the draw date for a game type.
 *     parameters:
 *       - in: path
 *         name: gameTypeId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the game type to update.
 *       - in: body
 *         name: gameTypes
 *         description: The ID of the game type to update and the new draw date.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             drawDate:
 *               type: string
 *               format: date-time
 *               description: The new draw date for the game type.
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
 *                   description: The ID of the updated game type.
 *                 name:
 *                   type: string
 *                   description: The name of the updated game type.
 *                 drawDate:
 *                   type: string
 *                   format: date-time
 *                   description: The new draw date for the game type.
 *                 reward:
 *                   type: number
 *                   description: The reward amount for the game type.
 *                 image:
 *                   type: string
 *                   description: The URL of the image for the game type.
 *                 ticketCost:
 *                   type: number
 *                   description: The cost of a ticket for the game type.
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
GameTypesRouter.put('/:gameTypeId',[body("drawDate").isDate()],validate,GameTypesController.updateGameTypeStatus);
export{GameTypesRouter};