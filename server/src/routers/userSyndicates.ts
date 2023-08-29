import express from "express";
import { UserSyndicateController } from "../controllers/userSyndicate";
const UserSyndicatesRouter = express.Router();
/**
 * Retrieve user syndicates by syndicate ID.
 * 
 * @param syndicateId The ID of the syndicate to retrieve user syndicates for.
 * @return An array of user syndicates associated with the syndicate.
 * 
 * @throws Error If the user syndicates cannot be retrieved.
 * 
 * @swagger
 * /api/userSyndicates/syndicates/{syndicateId}:
 *   get:
 *     summary: Retrieve user syndicates by syndicate ID
 *     description: Retrieve user syndicates by the ID of the syndicate they belong to.
 *     parameters:
 *       - name: syndicateId
 *         in: path
 *         description: ID of the syndicate to retrieve user syndicates for
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
 *                     description: The ID of the user syndicate
 *                   startDate:
 *                     type: string
 *                     format: date-time
 *                     description: The start date of the user syndicate
 *                   users:
 *                     type: object
 *                     description: The user associated with the user syndicate
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The ID of the user
 *                       firstName:
 *                         type: string
 *                         description: The first name of the user
 *                       lastName:
 *                         type: string
 *                         description: The last name of the user
 *                       email:
 *                         type: string
 *                         description: The email address of the user
 *                   syndicates:
 *                     type: object
 *                     description: The syndicate associated with the user syndicate
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The ID of the syndicate
 *                       createdDate:
 *                         type: string
 *                         format: date-time
 *                         description: The creation date of the syndicate
 *                       name:
 *                         type: string
 *                         description: The name of the syndicate
 *                       description:
 *                         type: string
 *                         description: The description of the syndicate
 *                       avatar:
 *                         type: string
 *                         description: The URL of the syndicate's avatar image
 *                   roles:
 *                     type: object
 *                     description: The role associated with the user syndicate
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The ID of the role
 *                       name:
 *                         type: string
 *                         description: The name of the role
 *       '404':
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message
 */
UserSyndicatesRouter.get('/syndicates/:syndicateId', UserSyndicateController.getUserSyndicateById)
/**
 * Retrieve a user syndicate by ID.
 * 
 * @param userSyndicateId The ID of the user syndicate to retrieve.
 * @return A JSON object containing the user syndicate's details.
 * @throws NotFoundException If the user syndicate is not found.
 * 
 * @swagger
 * /api/userSyndicates/userSyndicatesById/{userSyndicateId}:
 *   get:
 *     summary: Retrieve a user syndicate by ID
 *     description: Retrieve a user syndicate by its unique ID.
 *     parameters:
 *       - name: userSyndicateId
 *         in: path
 *         description: ID of the user syndicate to retrieve
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
 *                   description: The ID of the user syndicate
 *                 startDate:
 *                   type: string
 *                   format: date-time
 *                   description: The start date of the user syndicate
 *                 userId:
 *                   type: integer
 *                   description: The ID of the user associated with the user syndicate
 *                 syndicates:
 *                   type: object
 *                   description: The syndicate associated with the user syndicate
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The ID of the syndicate
 *                     createdDate:
 *                       type: string
 *                       format: date-time
 *                       description: The creation date of the syndicate
 *                     name:
 *                       type: string
 *                       description: The name of the syndicate
 *                     description:
 *                       type: string
 *                       description: The description of the syndicate
 *                     avatar:
 *                       type: string
 *                       description: The URL of the syndicate's avatar image
 *                 roleId:
 *                   type: integer
 *                   description: The ID of the role associated with the user syndicate
 *       '404':
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message
 */
UserSyndicatesRouter.get("/userSyndicatesById/:userSyndicateId", UserSyndicateController.getUserSyndicateByUserSyndicteId)
/**
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
*/
UserSyndicatesRouter.get("/user/:userId(\\d+)",UserSyndicateController.getSyndicatesByUserId);
/**
 * The Prisma client module.
 * 
 * This module exports a `prisma` object that can be used to interact with the database using the Prisma ORM.
 * 
 * @module prisma
 * 
 * @swagger
 * /api/userSyndicates/{userId}/syndicates/{syndicateId}/roles/{roleId}:
 *   post:
 *     summary: Create a new user syndicate
 *     description: Create a new user syndicate with the specified details.
 *     requestBody:
 *       description: The details of the user syndicate to create.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 description: The start date of the user syndicate
 *               userId:
 *                 type: integer
 *                 description: The ID of the user associated with the user syndicate
 *               syndicateId:
 *                 type: integer
 *                 description: The ID of the syndicate associated with the user syndicate
 *               roleId:
 *                 type: integer
 *                 description: The ID of the role associated with the user syndicate
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
 *                   format: date-time
 *                   description: The start date of the new user syndicate
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
UserSyndicatesRouter.post("/:userId(\\d+)/syndicates/:syndicateId(\\d+)/roles/:roleId", UserSyndicateController.createUserSyndicate)
/**
 * Update the role of a user syndicate with the specified ID.
 * 
 * @param userSyndicate An object containing the ID of the user syndicate to update and the new role ID.
 * @return An object containing the ID of the updated user syndicate and the new role ID.
 * 
 * @throws Error If the user syndicate cannot be updated.
 * 
 * @swagger
 * /api/userSyndicates/{userSyndicateId}:
 *   put:
 *     summary: Update a user syndicate
 *     description: Update the role of a user syndicate with the specified ID.
 *     parameters:
 *       - in: path
 *         name: userSyndicateId
 *         required: true
 *         description: The ID of the user syndicate to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: The details of the user syndicate to update.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roleId:
 *                 type: integer
 *                 description: The ID of the new role for the user syndicate.
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
 *                   description: The ID of the updated user syndicate.
 *                 role_id:
 *                   type: integer
 *                   description: The ID of the new role for the user syndicate.
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
UserSyndicatesRouter.put("/:userSyndicateId",UserSyndicateController.updateUserSyndicate);

/**
 * Delete a user syndicate with the specified ID.
 * 
 * @param userSyndicateId The ID of the user syndicate to delete.
 * @return An object containing the details of the deleted user syndicate.
 * 
 * @throws Error If the user syndicate cannot be deleted.
 * 
 * @swagger
 * /user-syndicates/{userSyndicateId}:
 *   delete:
 *     summary: Delete a user syndicate
 *     description: Delete the user syndicate with the specified ID.
 *     parameters:
 *       - in: path
 *         name: userSyndicateId
 *         required: true
 *         description: The ID of the user syndicate to delete.
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
 *                   description: The ID of the deleted user syndicate.
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
UserSyndicatesRouter.delete("/delete/:userSyndicateId",UserSyndicateController.deleteUserSyndicateById)

/**
 * Delete all user syndicates associated with the syndicate with the specified ID.
 * 
 * @param syndicateId The ID of the syndicate to delete user syndicates for.
 * @return An object containing the number of user syndicates deleted.
 * 
 * @throws Error If the user syndicates cannot be deleted.
 * 
 * @swagger
 * /api/userSyndicates/syndicate/{syndicateId}:
 *   delete:
 *     summary: Delete user syndicates by syndicate ID
 *     description: Delete all user syndicates associated with the syndicate with the specified ID.
 *     parameters:
 *       - in: path
 *         name: syndicateId
 *         required: true
 *         description: The ID of the syndicate to delete user syndicates for.
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
 *                 count:
 *                   type: integer
 *                   description: The number of user syndicates deleted.
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
UserSyndicatesRouter.delete("/syndicates/:syndicateId",UserSyndicateController.deleteUserSyndicateBySyndicateId)
export{UserSyndicatesRouter}