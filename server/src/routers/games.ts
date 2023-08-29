import express from "express";
import { GameController } from "../controllers/games";
import { body } from "express-validator";
import { validate } from "../utils/validation";

const GamesRouter = express.Router();
/**
 * Get all games.
 * 
 * @return An array of all games.
 * 
 * @swagger
 * /api/games:
 *   get:
 *     summary: Get all games
 *     description: Get all games.
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
 *                     description: The ID of the game.
 *                   maximumPlayers:
 *                     type: integer
 *                     description: The maximum number of players for the game.
 *                   treasury:
 *                     type: number
 *                     description: The amount of money in the game's treasury.
 *                   gameTypes:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The ID of the game type.
 *                       name:
 *                         type: string
 *                         description: The name of the game type.
 *                       drawDate:
 *                         type: string
 *                         format: date-time
 *                         description: The date of the next draw for the game type.
 *                       reward:
 *                         type: number
 *                         description: The reward amount for the game type.
 *                       image:
 *                         type: string
 *                         description: The URL of the image for the game type.
 *                       ticketCost:
 *                         type: number
 *                         description: The cost of a ticket for the game type.
 *                   syndicateId:
 *                     type: integer
 *                     description: The ID of the syndicate that owns the game.
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
GamesRouter.get("/", GameController.getAllGames);
/**
 * Get all games for a syndicate and game type.
 * 
 * @param gameTypeId The ID of the game type to retrieve games for.
 * @param syndicateId The ID of the syndicate to retrieve games for.
 * @return An array of all games for the specified syndicate and game type.
 * 
 * @swagger
 * /api/games/gameTypes/{gameTypeId}/syndicates/{syndicateId}:
 *   get:
 *     summary: Get all games for a syndicate and game type
 *     description: Get all games for a syndicate and game type.
 *     parameters:
 *       - in: path
 *         name: syndicateId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the syndicate to retrieve games for.
 *       - in: path
 *         name: gameTypeId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the game type to retrieve games for.
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
 *                     description: The ID of the game.
 *                   maximumPlayers:
 *                     type: integer
 *                     description: The maximum number of players for the game.
 *                   treasury:
 *                     type: number
 *                     description: The amount of money in the game's treasury.
 *                   gameTypes:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The ID of the game type.
 *                       name:
 *                         type: string
 *                         description: The name of the game type.
 *                       drawDate:
 *                         type: string
 *                         format: date-time
 *                         description: The date of the next draw for the game type.
 *                       reward:
 *                         type: number
 *                         description: The reward amount for the game type.
 *                       image:
 *                         type: string
 *                         description: The URL of the image for the game type.
 *                       ticketCost:
 *                         type: number
 *                         description: The cost of a ticket for the game type.
 *                   userGames:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           description: The ID of the user game.
 *                         user:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               description: The ID of the user.
 *                             name:
 *                               type: string
 *                               description: The name of the user.
 *                         game:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               description: The ID of the game.
 *                             maximumPlayers:
 *                               type: integer
 *                               description: The maximum number of players for the game.
 *                             treasury:
 *                               type: number
 *                               description: The amount of money in the game's treasury.
 *                             gameTypes:
 *                               type: object
 *                               properties:
 *                                 id:
 *                                   type: integer
 *                                   description: The ID of the game type.
 *                                 name:
 *                                   type: string
 *                                   description: The name of the game type.
 *                                 drawDate:
 *                                   type: string
 *                                   format: date-time
 *                                   description: The date of the next draw for the game type.
 *                                 reward:
 *                                   type: number
 *                                   description: The reward amount for the game type.
 *                                 image:
 *                                   type: string
 *                                   description: The URL of the image for the game type.
 *                                 ticketCost:
 *                                   type: number
 *                                   description: The cost of a ticket for the game type.
 *                             syndicateId:
 *                               type: integer
 *                               description: The ID of the syndicate that owns the game.
 *                   syndicateId:
 *                     type: integer
 *                     description: The ID of the syndicate that owns the game.
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
GamesRouter.get('/gameTypes/:gameTypeId/syndicates/:syndicateId',GameController.getGamesByTypeId)
/**
 * Get all games for a syndicate.
 * 
 * @param syndicateId The ID of the syndicate to retrieve games for.
 * @return An array of all games for the specified syndicate.
 * 
 * @swagger
 * /api/games/syndicate/{syndicateId}:
 *   get:
 *     summary: Get all games for a syndicate
 *     description: Get all games for a syndicate.
 *     parameters:
 *       - in: path
 *         name: syndicateId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the syndicate to retrieve games for.
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
 *                     description: The ID of the game.
 *                   maximumPlayers:
 *                     type: integer
 *                     description: The maximum number of players for the game.
 *                   treasury:
 *                     type: number
 *                     description: The amount of money in the game's treasury.
 *                   gameTypes:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The ID of the game type.
 *                       name:
 *                         type: string
 *                         description: The name of the game type.
 *                       drawDate:
 *                         type: string
 *                         format: date-time
 *                         description: The date of the next draw for the game type.
 *                       reward:
 *                         type: number
 *                         description: The reward amount for the game type.
 *                       image:
 *                         type: string
 *                         description: The URL of the image for the game type.
 *                       ticketCost:
 *                         type: number
 *                         description: The cost of a ticket for the game type.
 *                   syndicateId:
 *                     type: integer
 *                     description: The ID of the syndicate that owns the game.
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
GamesRouter.get("/syndicates/:syndicateId", GameController.getGamesBySyndicateId);
/**
 * Get all archived games.
 * 
 * @param userId The ID of the user to retrieve archived games for.
 * @return An array of all archived games.
 * 
 * @swagger
 * /api/games/archivedGames/{userId}:
 *   get:
 *     summary: Get all archived games
 *     description: Get all archived games.
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
 *                     description: The ID of the game.
 *                   maximumPlayers:
 *                     type: integer
 *                     description: The maximum number of players for the game.
 *                   treasury:
 *                     type: number
 *                     description: The amount of money in the game's treasury.
 *                   gameTypes:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The ID of the game type.
 *                       name:
 *                         type: string
 *                         description: The name of the game type.
 *                       drawDate:
 *                         type: string
 *                         format: date-time
 *                         description: The date of the next draw for the game type.
 *                       reward:
 *                         type: number
 *                         description: The reward amount for the game type.
 *                       image:
 *                         type: string
 *                         description: The URL of the image for the game type.
 *                       ticketCost:
 *                         type: number
 *                         description: The cost of a ticket for the game type.
 *                   syndicateId:
 *                     type: integer
 *                     description: The ID of the syndicate that owns the game.
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
GamesRouter.get("/archivedGames/:userId", GameController.getArchivedGames);
/**
 * Create a new game in a syndicate.
 * 
 * @param game An object containing the game data to create.
 * @param game.maximumPlayers The maximum number of players for the game.
 * @param game.syndicateId The ID of the syndicate to create the game in.
 * @param game.gameTypeId The ID of the game type for the game.
 * @return The newly created game.
 * 
 * @swagger
 * /api/games/syndicates/{syndicateId}/gameTypes/{gameTypesId}:
 *   post:
 *     summary: Create a new game in a syndicate
 *     description: Create a new game in a syndicate.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               maximumPlayers:
 *                 type: integer
 *                 description: The maximum number of players for the game.
 *               syndicateId:
 *                 type: integer
 *                 description: The ID of the syndicate to create the game in.
 *               gameTypeId:
 *                 type: integer
 *                 description: The ID of the game type for the game.
 *             required:
 *               - maximumPlayers
 *               - syndicateId
 *               - gameTypeId
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The ID of the game.
 *                 maximumPlayers:
 *                   type: integer
 *                   description: The maximum number of players for the game.
 *                 treasury:
 *                   type: number
 *                   description: The amount of money in the game's treasury.
 *                 gameTypes:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The ID of the game type.
 *                     name:
 *                       type: string
 *                       description: The name of the game type.
 *                     drawDate:
 *                       type: string
 *                       format: date-time
 *                       description: The date of the next draw for the game type.
 *                     reward:
 *                       type: number
 *                       description: The reward amount for the game type.
 *                     image:
 *                       type: string
 *                       description: The URL of the image for the game type.
 *                     ticketCost:
 *                       type: number
 *                       description: The cost of a ticket for the game type.
 *                 syndicateId:
 *                   type: integer
 *                   description: The ID of the syndicate that owns the game.
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
GamesRouter.post("/syndicates/:syndicateId/gameTypes/:gameTypesId", GameController.createGames);
/**
 * Update the treasury of a game.
 * 
 * @param game An object containing the game data to update.
 * @param game.gameId The ID of the game to update.
 * @param game.treasury The new treasury value for the game.
 * @return The updated game.
 * 
 * @swagger
 * /api/games/{gameId}:
 *   put:
 *     summary: Update the treasury of a game
 *     description: Update the treasury of a game.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               gameId:
 *                 type: integer
 *                 description: The ID of the game to update.
 *               treasury:
 *                 type: number
 *                 description: The new treasury value for the game.
 *             required:
 *               - gameId
 *               - treasury
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
 *                   description: The ID of the game.
 *                 maximumPlayers:
 *                   type: integer
 *                   description: The maximum number of players for the game.
 *                 treasury:
 *                   type: number
 *                   description: The amount of money in the game's treasury.
 *                 gameTypes:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The ID of the game type.
 *                     name:
 *                       type: string
 *                       description: The name of the game type.
 *                     drawDate:
 *                       type: string
 *                       format: date-time
 *                       description: The date of the next draw for the game type.
 *                     reward:
 *                       type: number
 *                       description: The reward amount for the game type.
 *                     image:
 *                       type: string
 *                       description: The URL of the image for the game type.
 *                     ticketCost:
 *                       type: number
 *                       description: The cost of a ticket for the game type.
 *                 syndicateId:
 *                   type: integer
 *                   description: The ID of the syndicate that owns the game.
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
GamesRouter.put( "/:gameId(\\d+)", 
[
  body("treasury").isNumeric(),
  ], validate, 
  GameController.UpdateGame);

/**
 * Get a game by ID.
 * 
 * @param gameId The ID of the game to retrieve.
 * @return The game with the specified ID.
 * 
 * @swagger
 * /api/games/{gameId}:
 *   get:
 *     summary: Get a game by ID
 *     description: Get a game by ID.
 *     parameters:
 *       - in: path
 *         name: gameId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the game to retrieve.
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
 *                   description: The ID of the game.
 *                 maximumPlayers:
 *                   type: integer
 *                   description: The maximum number of players for the game.
 *                 treasury:
 *                   type: number
 *                   description: The amount of money in the game's treasury.
 *                 gameTypes:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The ID of the game type.
 *                     name:
 *                       type: string
 *                       description: The name of the game type.
 *                     drawDate:
 *                       type: string
 *                       format: date-time
 *                       description: The date of the next draw for the game type.
 *                     reward:
 *                       type: number
 *                       description: The reward amount for the game type.
 *                     image:
 *                       type: string
 *                       description: The URL of the image for the game type.
 *                     ticketCost:
 *                       type: number
 *                       description: The cost of a ticket for the game type.
 *                 syndicateId:
 *                   type: integer
 *                   description: The ID of the syndicate that owns the game.
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
 GamesRouter.get('/:gameId', GameController.getGamesById)
/**
 * Archive a game.
 * 
 * @param game An object containing the ID of the game type and the new maximum number of players.
 * @return The updated game object.
 * 
 * @swagger
 * /api/games/gameTypes/{gameTypeId}:
 *   put:
 *     summary: Archive a game
 *     description: Archive a game.
 *     parameters:
 *       - in: body
 *         name: game
 *         description: The game object to archive.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             gameTypeId:
 *               type: integer
 *               description: The ID of the game type to archive.
 *             maximumPlayers:
 *               type: integer
 *               description: The new maximum number of players for the game type.
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
 *                   description: The ID of the game.
 *                 maximumPlayers:
 *                   type: integer
 *                   description: The maximum number of players for the game.
 *                 treasury:
 *                   type: number
 *                   description: The amount of money in the game's treasury.
 *                 gameTypes:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The ID of the game type.
 *                     name:
 *                       type: string
 *                       description: The name of the game type.
 *                     drawDate:
 *                       type: string
 *                       format: date-time
 *                       description: The date of the next draw for the game type.
 *                     reward:
 *                       type: number
 *                       description: The reward amount for the game type.
 *                     image:
 *                       type: string
 *                       description: The URL of the image for the game type.
 *                     ticketCost:
 *                       type: number
 *                       description: The cost of a ticket for the game type.
 *                 syndicateId:
 *                   type: integer
 *                   description: The ID of the syndicate that owns the game.
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
GamesRouter.put("/gameTypes/:gameTypeId",GameController.archiveGame)
export { GamesRouter }; 