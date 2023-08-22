import express from "express";
import { TicketController } from "../controllers/tickets";
import { body } from "express-validator";
import { validate } from "../utils/validation";
//setting up routers
const TicketRouter = express.Router();

TicketRouter.get("/"/**
* @swagger
* /api/tickets:
*   get:
*     summary: Retrieve all tickets.
*     description: Retrieves a tickets object array.
*     tags:
*      - tickets
*     responses:
*       200:
*         description: A valid array of tickets object.
*         content:
*           application/json:
*             schema:
*               type: array
*              
*/, TicketController.getAlltickets);
TicketRouter.get(
/**
* @swagger
* /api/tickets/games/{id}:
*   get:
*     summary: Retrieve all tickets by gameId.
*     description: Retrieves a user object based on its id.
*     tags:
*      - gameTickets
*     parameters:
*       - in: path
*         name: id
*         required: true
*         description: Numeric ID of the user to retrieve.
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
*/"/games/:gameId(\\d+)",TicketController.getTicketsByGameId);
TicketRouter.post(/**
* @swagger
* /api/tickets/syndicates/{syndicateId}/games/{gameId}:
*   post:
*     summary: Create a new ticket.
*     description: Creates a new ticket object.
*     tags:
*      - syndicates
*      - games
*     parameters:
*       - in: path
*         name: syndicateId
*         description: ID of the syndicate to create a ticket for.
*         required: true
*         schema:
*           type: integer
*       - in: path
*         name: gameId
*         required: true
*         schema:
*           type: integer
*         description: ID of the game to create a ticket for.
*       - in: body
*         name: ticketDetails
*         required: true
*         content:
*           schema:
*             type: object
*           properties:
*               ticket_code:
*                 type: string
*                 description: ticket_code
*                 example: "John Graham"
*               total_reward_value:
*                 type: number
*                 description: total_reward_value
*                 example: 23453  
*               ticket_status_id:
*                 type: number
*                 description: ticket status id  
*     responses:
*       201:
*         description: Created a new ticket.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 id:
*                   type: number
*                 ticket_code:
*                   type: string
*                 total_reward_value:
*                   type: number
*                 ticket_status_id:
*                   type: number
*                 syndicateId:
*                   type: number
*                 gameId:
*                   type: number
*/

"/games/:gameId(\\d+)",[
    
    body("totalRewardValue").isNumeric(),
    body("ticketStatusId").isNumeric().isLength({min: 1}).trim(),
  ],validate, TicketController.createTickets);
TicketRouter.put( /**
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
"/:ticketId(\\d+)",[
    body("ticket_code").isString().isLength({ min: 3 }),
    body("total_reward_value").isNumeric().isLength({ min: 3 }).trim(),
    body("ticket_status_id").isNumeric().isLength({min: 1}).trim(),
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