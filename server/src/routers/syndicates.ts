import express from "express";
import { SyndicateController } from "../controllers/syndicates";
import { resolver } from "../middleware/_resolver";
import { body } from "express-validator";

const SyndicatesRouter = express.Router();

SyndicatesRouter.get("/"/**
* @swagger
* /api/sydicates:
*   get:
*     summary: Retrieve all syndicates.
*     description: Retrieves a syndicates object array.
*     tags:
*      - syndicates
*     responses:
*       200:
*         description: A valid array of syndicates object.
*         content:
*           application/json:
*             schema:
*               type: array
*              
*/
, SyndicateController.getAllSyndicates);
SyndicatesRouter.get("/:syndicateId(\\d+)", SyndicateController.getSyndicatesById); 
SyndicatesRouter.get(/**
* @swagger
* /api/syndicates/user/{id}:
*   get:
*     summary: Retrieve all syndicates by syndicateId.
*     description: Retrieves a syndicate object based on its id.
*     tags:
*      - syndicates
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
*/"/user/:userId(\\d+)",SyndicateController.getSyndicatesByUserId);
SyndicatesRouter.post(/**
* @swagger
* /api/syndicates/create/users/{userId}:
*   post:
*     summary: Create a new syndicate.
*     description: Creates a new syndicate.
*     tags:
*      - create
*      - syndicates
*     parameters:
*       - in: path
*         name: userId
*         description: id 
*         required: true
*         schema:
*           type: integer
*           example: 1
*       - in: body
*         name: userDetails
*         required: true
*         description: User details for signing up.
*         schema:
*           type: object
*           properties:
*             created_date:
*               type: string
*               format: date
*               description: The user's date.
*             name:
*               type: string
*               description: The user's name.
*               example: name
*             description:
*               type: string
*               description: The user's description.
*               example: good stuff
*             avatar: 
*               type: string
*               description: The user's avatar.
*               example: image.png
*     responses:
*       201:
*         description: Created a new user.
*         content:
*           application/json:
*             schema:
*               type: array
*               
*/
"/create/users/:userId(\\d+)",[
    body("ticket_code").isString().isLength({ min: 3 }),
    body("total_reward_value").isNumeric().isLength({ min: 3 }).trim(),
    body("ticket_status_id").isNumeric().isLength({min: 1}).trim(),
    body("required_ticket_number").isNumeric().isLength({min:1})
  ],resolver, SyndicateController.createSyndicate);
SyndicatesRouter.put(/**
* @swagger
* /api/syndicates/update/{syndicateId}:
*   put:
*     tags: 
*       - syndicates 
*     summary: Updates an existing syndicate
*     parameters:
*       - in: path 
*         name: syndicateId
*         schema:
*           type: integer
*         description: The id of the requested user.
*       - in: body
*         name: updateSyndicates
*         description: "syndicate details to update"
*         schema:
*           type: object
*           properties:
*            name:
*             type: string
*             required: false
*             description: update name
*            description:
*             type: string
*             required: false
*             description: update description
*             example: good syndicate
*            avatar:
*             type: string
*             required: false
*             description: new avatar
*           
*     responses:
*       400:
*         description: Bad Request - required values are missing.
*       200:
*         description: User Updated
*/"/update/:syndicateId(\\d+)",[
    body("ticket_code").isString().isLength({ min: 3 }),
    body("total_reward_value").isNumeric().isLength({ min: 3 }).trim(),
    body("ticket_status_id").isNumeric().isLength({min: 1}).trim(),
    body("required_ticket_number").isNumeric().isLength({min:1})
  ], resolver, SyndicateController.UpdateSyndicateDetails);
SyndicatesRouter.put(/**
* @swagger
* /api/tickets/delete/{syndicateId}:
*   put:
*     tags: 
*       - syndicates
*     summary: Deletes a syndicate
*     parameters:
*       - in: path 
*         name: syndicateId
*         schema:
*           type: integer
*         description: The id of the requested syndicate.
*       - in: body
*         name: deleteSyndicates
*         description: "syndicate details to update"
*         schema:
*           type: object
*           properties:
*            name:
*             type: string
*             required: false
*             description: delete total reward
*             example: "DELETED"
*            description:
*             type: string
*             required: false
*             description: delete syndicate
*             example: "DELETED"
*           
*     responses:
*       400:
*         description: Bad Request - required values are missing.
*       200:
*         description: User Updated
*/"/delete/:syndicateId(\\d+)",SyndicateController.deleteSyndicateById);
export { SyndicatesRouter }; 