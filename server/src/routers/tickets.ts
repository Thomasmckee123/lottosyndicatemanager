import express from "express";
import { TicketController } from "../controllers/tickets";
import { body } from "express-validator";
import { validate } from "../utils/validation";
//setting up routers
const TicketRouter = express.Router();
/**
 * Get all tickets.
 * 
 * @return An array of objects containing the details of all tickets.
 * 
 * @swagger
 * /api/tickets:
 *   get:
 *     summary: Get all tickets
 *     description: Get all tickets.
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
 *                     description: The ID of the ticket.
 *                   ticketCode:
 *                     type: string
 *                     description: The code of the ticket.
 *                   totalRewardValue:
 *                     type: number
 *                     description: The total reward value of the ticket.
 *                   ticketStatus:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The ID of the ticket status.
 *                       name:
 *                         type: string
 *                         description: The name of the ticket status.
 *                   games:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The ID of the game.
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
 *                           reward:
 *                             type: number
 *                             description: The reward of the game type.
 *                           image:
 *                             type: string
 *                             description: The image of the game type.
 *                           ticketCost:
 *                             type: number
 *                             description: The ticket cost of the game type.
 *                       syndicateId:
 *                         type: integer
 *                         description: The ID of the syndicate.
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
TicketRouter.get("/", TicketController.getAlltickets);
/**
 * Get tickets by game ID.
 * 
 * @param gameId The ID of the game to get tickets for.
 * 
 * @return An array of objects containing the details of all tickets for the specified game.
 * 
 * @swagger
 * /api/tickets/games/{gameId}:
 *   get:
 *     summary: Get tickets by game ID
 *     description: Get all tickets for the specified game.
 *     parameters:
 *       - in: path
 *         name: gameId
 *         required: true
 *         description: The ID of the game to get tickets for.
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
 *                     description: The ID of the ticket.
 *                   ticketCode:
 *                     type: string
 *                     description: The code of the ticket.
 *                   totalRewardValue:
 *                     type: number
 *                     description: The total reward value of the ticket.
 *                   ticketStatus:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The ID of the ticket status.
 *                       name:
 *                         type: string
 *                         description: The name of the ticket status.
 *                   games:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The ID of the game.
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
 *                           reward:
 *                             type: number
 *                             description: The reward of the game type.
 *                           image:
 *                             type: string
 *                             description: The image of the game type.
 *                           ticketCost:
 *                             type: number
 *                             description: The ticket cost of the game type.
 *                       syndicateId:
 *                         type: integer
 *                         description: The ID of the syndicate.
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
TicketRouter.get("/games/:gameId(\\d+)",TicketController.getTicketsByGameId);
/**
 * Create a new ticket for a game.
 * 
 * @param ticket An object containing the details of the ticket to create.
 * 
 * @return The code of the newly created ticket.
 * 
 * @swagger
 * /api/tickets:
 *   post:
 *     summary: Create a new ticket for a game
 *     description: Create a new ticket for a game.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ticketCode:
 *                 type: string
 *                 description: The code of the ticket.
 *               totalRewardValue:
 *                 type: number
 *                 description: The total reward value of the ticket.
 *               ticketStatusId:
 *                 type: integer
 *                 description: The ID of the ticket status.
 *               gameId:
 *                 type: integer
 *                 description: The ID of the game.
 *             required:
 *               - ticketCode
 *               - totalRewardValue
 *               - ticketStatusId
 *               - gameId
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ticketCode:
 *                   type: string
 *                   description: The code of the newly created ticket.
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
TicketRouter.post("/games/:gameId(\\d+)",[
    
    body("totalRewardValue").isNumeric(),
    body("ticketStatusId").isNumeric().isLength({min: 1}).trim(),
  ],validate, TicketController.createTickets);
/**
* @swagger
* /api/tickets/update/{ticketId}:
*   put:
*     tags: 
*       - tickets 
*     summary: Updates an existing ticket
*     parameters:
*       - in: path 
*         name: ticketId
*         schema:
*           type: integer
*         description: The id of the requested user.
*       - in: body
*         name: updateTickets
*         description: "ticket details to update"
*         schema:
*           type: object
*           properties:
*            total_reward_value:
*             type: string
*             required: false
*             description: update total reward
*            ticket_status_id:
*             type: integer
*             required: false
*             description: update the status
*             example: 1
*           
*     responses:
*       400:
*         description: Bad Request - required values are missing.
*       200:
*         description: User Updated
*/
TicketRouter.put( 
"/:ticketId(\\d+)",[
    body("ticketCode").isString().isLength({ min: 3 }),
    body("totalRewardValue").isNumeric().isLength({ min: 3 }).trim(),
    body("ticketStatusId").isNumeric().isLength({min: 1}).trim(),
  ],validate, TicketController.updateTicketStatus);

TicketRouter.put( /**
* @swagger
* /api/tickets/delete/{ticketId}:
*   put:
*     tags: 
*       - tickets 
*     summary: Updates an existing ticket
*     parameters:
*       - in: path 
*         name: ticketId
*         schema:
*           type: integer
*         description: The id of the requested user.
*       - in: body
*         name: updateTickets
*         description: "ticket details to update"
*         schema:
*           type: object
*           properties:
*            ticket_code:
*             type: string
*             required: false
*             description: update total reward
*             example: "DELETED"
*            ticket_status_id:
*             type: integer
*             required: false
*             description: update the status
*             example: 1
*           
*     responses:
*       400:
*         description: Bad Request - required values are missing.
*       200:
*         description: User Updated
*/"/delete/:ticketId(\\d+)",TicketController.deleteTicketById);
export { TicketRouter }; 