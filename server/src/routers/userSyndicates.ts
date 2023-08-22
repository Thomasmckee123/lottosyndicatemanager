import express from "express";
import { UserSyndicateController } from "../controllers/userSyndicate";
const UserSyndicatesRouter = express.Router();

UserSyndicatesRouter.get('/syndicates/:syndicateId', UserSyndicateController.getUserSyndicateById)
UserSyndicatesRouter.get("/userSyndicatesById/:userSyndicateId", UserSyndicateController.getUserSyndicateByUserSyndicteId)
UserSyndicatesRouter.get(/**
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
*/"/user/:userId(\\d+)",UserSyndicateController.getSyndicatesByUserId);
UserSyndicatesRouter.post(/**
* @swagger
* /api/users/{userId}/syndicates/{syndicateId}:
*   post:
*     summary: Create a new user syndicate.
*     description: Creates a new review object.
*     tags:
*       - syndicates
*       - users
*     parameters: 
*      -  in: path
*         name: userId
*         description: ID of user.
*         required: true
*         schema:
*           type: integer
*      -  in: path
*         name: syndicateId
*         required: true
*         schema:
*           type: integer
*         description: ID of snyndicate
*      - in: body
*        name: userSyndicateDetails
*        required: true
*        description: syndicate details
*        schema: 
*           type: object
*        properties:  
*                start_date:
*                 type: date
*                 description: start date
*                 example: 2022/10/2
*                role_id:
*                 type: integer
*                 description: role
*                 example: 2
*     responses:
*       201:
*         description: Created a new user syndicate
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 id:
*                   type: number
*                 created_date:
*                   type: string
*                 format: date-time
*                 title:
*                   type: string
*                 content:
*                   type: string
*                 userId:
*                   type: number
*                 syndicateId:
*                   type: number
*/"/:userId(\\d+)/syndicates/:syndicateId(\\d+)/roles/:roleId", UserSyndicateController.createUserSyndicate)

UserSyndicatesRouter.put("/:userSyndicateId",UserSyndicateController.updateUserSyndicate);
UserSyndicatesRouter.delete("/delete/:userSyndicateId",UserSyndicateController.deleteUserSyndicateById)
export{UserSyndicatesRouter}