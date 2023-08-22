import express from "express";
import { SyndicateController } from "../controllers/syndicates";
import { body } from "express-validator";
import { validate } from "../utils/validation";

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
SyndicatesRouter.get("/name/:name", SyndicateController.getSyndicateByName);


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
"/users/:ownerId(\\d+)",[
    body("name").isString().isLength({ min: 3 }),
    body("description").isString().isLength({ min: 3 }).trim(),
    
  ],validate, SyndicateController.createSyndicate);

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
*/"/:syndicateId(\\d+)",[
    body("ticket_code").isString().isLength({ min: 3 }),
    body("total_reward_value").isNumeric().isLength({ min: 3 }).trim(),
    body("ticket_status_id").isNumeric().isLength({min: 1}).trim(),
    body("required_ticket_number").isNumeric().isLength({min:1})
  ], validate, SyndicateController.UpdateSyndicateDetails);
SyndicatesRouter.delete(/**
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
*/"/:syndicateId(\\d+)",SyndicateController.deleteSyndicateById);
export { SyndicatesRouter }; 