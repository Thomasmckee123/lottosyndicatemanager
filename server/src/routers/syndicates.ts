import express from "express";
import { SyndicateController } from "../controllers/syndicates";
import { body } from "express-validator";
import { validate } from "../utils/validation";

const SyndicatesRouter = express.Router();
/**
 * Get all syndicates.
 * 
 * @return An array of objects containing the details of all syndicates.
 * 
 * @swagger
 * /api/syndicates:
 *   get:
 *     summary: Get all syndicates
 *     description: Get all syndicates.
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
 *                     description: The ID of the syndicate.
 *                   createdDate:
 *                     type: string
 *                     format: date-time
 *                     description: The date the syndicate was created.
 *                   name:
 *                     type: string
 *                     description: The name of the syndicate.
 *                   description:
 *                     type: string
 *                     nullable: true
 *                     description: The description of the syndicate.
 *                   avatar:
 *                     type: string
 *                     nullable: true
 *                     description: The avatar of the syndicate.
 *                   ownerId:
 *                     type: integer
 *                     description: The ID of the owner of the syndicate.
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
SyndicatesRouter.get("/", SyndicateController.getAllSyndicates);
/**
 * Get a syndicate by ID.
 * 
 * @param syndicateId The ID of the syndicate to retrieve.
 * @return An object containing the details of the syndicate.
 * 
 * @swagger
 * /api/syndicates/{syndicateId}:
 *   get:
 *     summary: Get a syndicate by ID
 *     description: Get a syndicate by ID.
 *     parameters:
 *       - in: path
 *         name: syndicateId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the syndicate to retrieve.
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
 *                   description: The ID of the syndicate.
 *                 createdDate:
 *                   type: string
 *                   format: date-time
 *                   description: The date the syndicate was created.
 *                 name:
 *                   type: string
 *                   description: The name of the syndicate.
 *                 description:
 *                   type: string
 *                   nullable: true
 *                   description: The description of the syndicate.
 *                 avatar:
 *                   type: string
 *                   nullable: true
 *                   description: The avatar of the syndicate.
 *                 ownerId:
 *                   type: integer
 *                   description: The ID of the owner of the syndicate.
 *                 users:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The ID of the user.
 *                     firstName:
 *                       type: string
 *                       description: The first name of the user.
 *                     lastName:
 *                       type: string
 *                       description: The last name of the user.
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
SyndicatesRouter.get("/:syndicateId(\\d+)", SyndicateController.getSyndicatesById); 
/**
 * Get syndicates by name.
 * 
 * @param name The name of the syndicates to retrieve.
 * @return An array of objects containing the details of the syndicates.
 * 
 * @swagger
 * /api/syndicates/name/{name}:
 *   get:
 *     summary: Get syndicates by name
 *     description: Get syndicates by name.
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the syndicates to retrieve.
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
 *                     description: The ID of the syndicate.
 *                   createdDate:
 *                     type: string
 *                     format: date-time
 *                     description: The date the syndicate was created.
 *                   name:
 *                     type: string
 *                     description: The name of the syndicate.
 *                   description:
 *                     type: string
 *                     nullable: true
 *                     description: The description of the syndicate.
 *                   avatar:
 *                     type: string
 *                     nullable: true
 *                     description: The avatar of the syndicate.
 *                   ownerId:
 *                     type: integer
 *                     description: The ID of the owner of the syndicate.
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

/**
 * Update the details of a syndicate.
 * 
 * @param syndicate An object containing the details of the syndicate to update.
 * @return An object containing the updated details of the syndicate.
 * 
 * @swagger
 * /api/syndicates:
 *   put:
 *     summary: Update the details of a syndicate
 *     description: Update the details of a syndicate.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: The ID of the syndicate to update.
 *               name:
 *                 type: string
 *                 description: The updated name of the syndicate.
 *               description:
 *                 type: string
 *                 nullable: true
 *                 description: The updated description of the syndicate.
 *               avatar:
 *                 type: string
 *                 nullable: true
 *                 description: The updated avatar of the syndicate.
 *             required:
 *               - id
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
 *                   description: The ID of the syndicate.
 *                 createdDate:
 *                   type: string
 *                   format: date-time
 *                   description: The date the syndicate was created.
 *                 name:
 *                   type: string
 *                   description: The name of the syndicate.
 *                 description:
 *                   type: string
 *                   nullable: true
 *                   description: The description of the syndicate.
 *                 avatar:
 *                   type: string
 *                   nullable: true
 *                   description: The avatar of the syndicate.
 *                 ownerId:
 *                   type: integer
 *                   description: The ID of the owner of the syndicate.
 *                 users:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The ID of the user.
 *                     firstName:
 *                       type: string
 *                       description: The first name of the user.
 *                     lastName:
 *                       type: string
 *                       description: The last name of the user.
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
SyndicatesRouter.put("/:syndicateId(\\d+)",[
  body("name").isString().isLength({ min: 3 }),
  body("description").isString().isLength({ min: 3 }).trim(),
  ], validate, SyndicateController.UpdateSyndicateDetails);
/**
 * Delete a syndicate by ID.
 * 
 * @param syndicateId The ID of the syndicate to delete.
 * @return An object containing the updated details of the deleted syndicate.
 * 
 * @swagger
 * /syndicates/{syndicateId}:
 *   delete:
 *     summary: Delete a syndicate by ID
 *     description: Delete a syndicate by ID.
 *     parameters:
 *       - in: path
 *         name: syndicateId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the syndicate to delete.
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
 *                   description: The ID of the deleted syndicate.
 *                 createdDate:
 *                   type: string
 *                   format: date-time
 *                   description: The date the syndicate was deleted.
 *                 name:
 *                   type: string
 *                   description: The name of the deleted syndicate.
 *                 description:
 *                   type: string
 *                   nullable: true
 *                   description: The description of the deleted syndicate.
 *                 avatar:
 *                   type: string
 *                   nullable: true
 *                   description: The avatar of the deleted syndicate.
 *                 ownerId:
 *                   type: integer
 *                   description: The ID of the owner of the deleted syndicate.
 *                 users:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The ID of the user.
 *                     firstName:
 *                       type: string
 *                       description: The first name of the user.
 *                     lastName:
 *                       type: string
 *                       description: The last name of the user.
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
SyndicatesRouter.delete("/:syndicateId(\\d+)",SyndicateController.deleteSyndicateById);

/**
 * Add an image to a syndicate.
 * 
 * @param syndicateId The ID of the syndicate to add the image to.
 * @param avatar The URL of the image to add to the syndicate.
 * @return An object containing the updated details of the syndicate.
 * 
 * @swagger
 * /syndicates/{syndicateId}/avatar:
 *   post:
 *     summary: Add an image to a syndicate
 *     description: Add an image to a syndicate.
 *     parameters:
 *       - in: path
 *         name: syndicateId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the syndicate to add the image to.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 description: The URL of the image to add to the syndicate.
 *             required:
 *               - avatar
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
 *                   description: The ID of the syndicate.
 *                 createdDate:
 *                   type: string
 *                   format: date-time
 *                   description: The date the syndicate was created.
 *                 name:
 *                   type: string
 *                   description: The name of the syndicate.
 *                 description:
 *                   type: string
 *                   nullable: true
 *                   description: The description of the syndicate.
 *                 avatar:
 *                   type: string
 *                   nullable: true
 *                   description: The avatar of the syndicate.
 *                 ownerId:
 *                   type: integer
 *                   description: The ID of the owner of the syndicate.
 *                 users:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The ID of the user.
 *                     firstName:
 *                       type: string
 *                       description: The first name of the user.
 *                     lastName:
 *                       type: string
 *                       description: The last name of the user.
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
SyndicatesRouter.put("/photo/:syndicateId", SyndicateController.addSyndicateImage);
export { SyndicatesRouter }; 