import express from "express";
import { UserGameController } from "../controllers/userGames";
import { body } from "express-validator";
import { validate } from '../utils/validation'


const UserGameRouter = express.Router()

/**
 * Get all user games.
 * 
 * @return An array of objects containing the details of the user games.
 * 
 * @throws Error If the user games cannot be retrieved.
 * 
 * @swagger
 * /api/userGames:
 *   get:
 *     summary: Get all user games
 *     description: Get all user games.
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
 *                     description: The ID of the user game.
 *                   startDate:
 *                     type: string
 *                     description: The start date of the user game.
 *                   deposit:
 *                     type: number
 *                     description: The deposit of the user game.
 *                   roleId:
 *                     type: integer
 *                     description: The role ID of the user game.
 *                   userId:
 *                     type: integer
 *                     description: The user ID of the user game.
 *                   games:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The ID of the game.
 *                       maximumPlayers:
 *                         type: integer
 *                         description: The maximum number of players for the game.
 *                       treasury:
 *                         type: number
 *                         description: The treasury of the game.
 *                       gameTypes:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             description: The ID of the game type.
 *                           name:
 *                             type: string
 *                             description: The name of the game type.
 *                           drawDate:
 *                             type: string
 *                             description: The draw date of the game type.
 *                           image:
 *                             type: string
 *                             description: The image URL of the game type.
 *                       syndicates:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             description: The ID of the syndicate.
 *                           name:
 *                             type: string
 *                             description: The name of the syndicate.
 *                           description:
 *                             type: string
 *                             description: The description of the syndicate.
 *                           avatar:
 *                             type: string
 *                             description: The avatar URL of the syndicate.
 *                           ownerId:
 *                             type: integer
 *                             description: The owner ID of the syndicate.
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
UserGameRouter.get('/',UserGameController.getAllUserGames);
/**
 * Get games by user game ID.
 * 
 * @param userSyndicateId The ID of the user syndicate.
 * 
 * @return An array of objects containing the details of the user games.
 * 
 * @throws Error If the user games cannot be retrieved.
 * 
 * @swagger
 * /api/userGames/{userSyndicateId}:
 *   get:
 *     summary: Get games by user game ID
 *     description: Get games by user game ID.
 *     parameters:
 *       - in: path
 *         name: userSyndicateId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the user syndicate.
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
 *                     description: The ID of the user game.
 *                   startDate:
 *                     type: string
 *                     description: The start date of the user game.
 *                   deposit:
 *                     type: number
 *                     description: The deposit of the user game.
 *                   roleId:
 *                     type: integer
 *                     description: The role ID of the user game.
 *                   userId:
 *                     type: integer
 *                     description: The user ID of the user game.
 *                   games:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The ID of the game.
 *                       maximumPlayers:
 *                         type: integer
 *                         description: The maximum number of players for the game.
 *                       treasury:
 *                         type: number
 *                         description: The treasury of the game.
 *                       gameTypes:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             description: The ID of the game type.
 *                           name:
 *                             type: string
 *                             description: The name of the game type.
 *                           drawDate:
 *                             type: string
 *                             description: The draw date of the game type.
 *                           image:
 *                             type: string
 *                             description: The image URL of the game type.
 *                       syndicates:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             description: The ID of the syndicate.
 *                           name:
 *                             type: string
 *                             description: The name of the syndicate.
 *                           description:
 *                             type: string
 *                             description: The description of the syndicate.
 *                           avatar:
 *                             type: string
 *                             description: The avatar URL of the syndicate.
 *                           ownerId:
 *                             type: integer
 *                             description: The owner ID of the syndicate.
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
UserGameRouter.get('/:userGameId',UserGameController.getUserGamesByUserGameId);
/**
 * Get games by game ID.
 * 
 * @param gameId The ID of the game.
 * 
 * @return An array of objects containing the details of the user games for the specified game.
 * 
 * @throws Error If the user games cannot be retrieved.
 * 
 * @swagger
 * /api/userGames/games/{gameId}:
 *   get:
 *     summary: Get games by game ID
 *     description: Get games by game ID.
 *     parameters:
 *       - in: path
 *         name: gameId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the game.
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
 *                     description: The ID of the user game.
 *                   startDate:
 *                     type: string
 *                     description: The start date of the user game.
 *                   deposit:
 *                     type: number
 *                     description: The deposit of the user game.
 *                   roleId:
 *                     type: integer
 *                     description: The ID of the role.
 *                   users:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The ID of the user.
 *                       firstName:
 *                         type: string
 *                         description: The first name of the user.
 *                       lastName:
 *                         type: string
 *                         description: The last name of the user.
 *                       email:
 *                         type: string
 *                         description: The email of the user.
 *                       balance:
 *                         type: number
 *                         description: The balance of the user.
 *                       image:
 *                         type: string
 *                         description: The image URL of the user.
 *                   games:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The ID of the game.
 *                       maximumPlayers:
 *                         type: integer
 *                         description: The maximum number of players for the game.
 *                       treasury:
 *                         type: number
 *                         description: The treasury of the game.
 *                       gameTypes:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             description: The ID of the game type.
 *                           name:
 *                             type: string
 *                             description: The name of the game type.
 *                           drawDate:
 *                             type: string
 *                             description: The draw date of the game type.
 *                           image:
 *                             type: string
 *                             description: The image URL of the game type.
 *                       syndicates:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             description: The ID of the syndicate.
 *                           name:
 *                             type: string
 *                             description: The name of the syndicate.
 *                           description:
 *                             type: string
 *                             description: The description of the syndicate.
 *                           avatar:
 *                             type: string
 *                             description: The avatar URL of the syndicate.
 *                           ownerId:
 *                             type: integer
 *                             description: The owner ID of the syndicate.
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
UserGameRouter.get('/games/:gameId',UserGameController.getUserGamesByGameId);
/**
 * Get games by syndicate ID.
 * 
 * @param syndicateId The ID of the syndicate.
 * 
 * @return An array of objects containing the details of the user games.
 * 
 * @throws Error If the user games cannot be retrieved.
 * 
 * @swagger
 * /api/userGames/syndicate/{syndicateId}:
 *   get:
 *     summary: Get games by syndicate ID
 *     description: Get games by syndicate ID.
 *     parameters:
 *       - in: path
 *         name: syndicateId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the syndicate.
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
 *                     description: The ID of the user game.
 *                   startDate:
 *                     type: string
 *                     description: The start date of the user game.
 *                   deposit:
 *                     type: number
 *                     description: The deposit of the user game.
 *                   roleId:
 *                     type: integer
 *                     description: The role ID of the user game.
 *                   userId:
 *                     type: integer
 *                     description: The user ID of the user game.
 *                   games:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The ID of the game.
 *                       maximumPlayers:
 *                         type: integer
 *                         description: The maximum number of players for the game.
 *                       treasury:
 *                         type: number
 *                         description: The treasury of the game.
 *                       gameTypes:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             description: The ID of the game type.
 *                           name:
 *                             type: string
 *                             description: The name of the game type.
 *                           drawDate:
 *                             type: string
 *                             description: The draw date of the game type.
 *                           image:
 *                             type: string
 *                             description: The image URL of the game type.
 *                       syndicates:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             description: The ID of the syndicate.
 *                           name:
 *                             type: string
 *                             description: The name of the syndicate.
 *                           description:
 *                             type: string
 *                             description: The description of the syndicate.
 *                           avatar:
 *                             type: string
 *                             description: The avatar URL of the syndicate.
 *                           ownerId:
 *                             type: integer
 *                             description: The owner ID of the syndicate.
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
UserGameRouter.get('/syndicates/:syndicateId',UserGameController.getUserGamesBySyndicateId);
/**
 * Get games by user ID.
 * 
 * @param userId The ID of the user.
 * 
 * @return An array of objects containing the details of the user games.
 * 
 * @throws Error If the user games cannot be retrieved.
 * 
 * @swagger
 * /api/userGames/users/{userId}:
 *   get:
 *     summary: Get games by user ID
 *     description: Get games by user ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the user.
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
 *                     description: The ID of the user game.
 *                   startDate:
 *                     type: string
 *                     description: The start date of the user game.
 *                   deposit:
 *                     type: number
 *                     description: The deposit of the user game.
 *                   roles:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The ID of the role.
 *                       name:
 *                         type: string
 *                         description: The name of the role.
 *                   userId:
 *                     type: integer
 *                     description: The user ID of the user game.
 *                   games:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The ID of the game.
 *                       maximumPlayers:
 *                         type: integer
 *                         description: The maximum number of players for the game.
 *                       treasury:
 *                         type: number
 *                         description: The treasury of the game.
 *                       gameTypes:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             description: The ID of the game type.
 *                           name:
 *                             type: string
 *                             description: The name of the game type.
 *                           drawDate:
 *                             type: string
 *                             description: The draw date of the game type.
 *                           image:
 *                             type: string
 *                             description: The image URL of the game type.
 *                       syndicates:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             description: The ID of the syndicate.
 *                           name:
 *                             type: string
 *                             description: The name of the syndicate.
 *                           createdDate:
 *                             type: string
 *                             description: The created date of the syndicate.
 *                           description:
 *                             type: string
 *                             description: The description of the syndicate.
 *                           avatar:
 *                             type: string
 *                             description: The avatar URL of the syndicate.
 *                           ownerId:
 *                             type: integer
 *                             description: The owner ID of the syndicate.
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
UserGameRouter.get('/users/:userId', UserGameController.getUserGamesByUserId);
/**
 * Create a user game.
 * 
 * @param userGame An object containing the details of the user game to create.
 * 
 * @return The start date of the created user game.
 * 
 * @throws Error If the user game cannot be created.
 * 
 * @swagger
 * /api/userGames/games/{gameId}/users/{userId}:
 *   post:
 *     summary: Create a user game
 *     description: Create a user game.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startDate:
 *                 type: string
 *                 description: The start date of the user game.
 *               deposit:
 *                 type: number
 *                 description: The deposit of the user game.
 *               gameId:
 *                 type: integer
 *                 description: The ID of the game.
 *               roleId:
 *                 type: integer
 *                 description: The ID of the role.
 *               userId:
 *                 type: integer
 *                 description: The ID of the user.
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 startDate:
 *                   type: string
 *                   description: The start date of the created user game.
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
UserGameRouter.post('/games/:gameId/users/:userId',[
    body("deposit").isNumeric()],
    validate,UserGameController.createUserGame);
/**
 * Update a user game.
 * 
 * @param userGame An object containing the details of the user game to update.
 * 
 * @return An object containing the updated details of the user game.
 * 
 * @swagger
 * /api/userGames:
 *   put:
 *     summary: Update a user game
 *     description: Update a user game.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: The ID of the user game to update.
 *               deposit:
 *                 type: number
 *                 description: The new deposit of the user game.
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
 *                   description: The ID of the updated user game.
 *                 start_date:
 *                   type: string
 *                   description: The start date of the updated user game.
 *                 deposit:
 *                   type: number
 *                   description: The deposit of the updated user game.
 *                 game_id:
 *                   type: integer
 *                   description: The ID of the game of the updated user game.
 *                 role_id:
 *                   type: integer
 *                   description: The ID of the role of the updated user game.
 *                 user_id:
 *                   type: integer
 *                   description: The ID of the user of the updated user game.
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
UserGameRouter.put('/',[
    body("deposit").isNumeric(),
    body("userGameId").isNumeric()],
    validate,UserGameController.UpdateUserGame);
/**
 * Update the role of a user game.
 * 
 * @param userGame An object containing the details of the user game to update.
 * 
 * @return An object containing the updated details of the user game.
 * 
 * @swagger
 * /api/userGames/{userGameId}}:
 *   put:
 *     summary: Update the role of a user game
 *     description: Update the role of a user game.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userGameId:
 *                 type: integer
 *                 description: The ID of the user game to update.
 *               roleId:
 *                 type: integer
 *                 description: The new role ID of the user game.
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
 *                   description: The ID of the updated user game.
 *                 start_date:
 *                   type: string
 *                   description: The start date of the updated user game.
 *                 deposit:
 *                   type: number
 *                   description: The deposit of the updated user game.
 *                 game_id:
 *                   type: integer
 *                   description: The ID of the game of the updated user game.
 *                 role_id:
 *                   type: integer
 *                   description: The ID of the role of the updated user game.
 *                 user_id:
 *                   type: integer
 *                   description: The ID of the user of the updated user game.
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
UserGameRouter.put('/:userGameId',UserGameController.UpdateUserRole)








export default UserGameRouter