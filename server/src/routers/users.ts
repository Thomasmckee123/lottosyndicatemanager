import express from "express";
import { UserController } from "../controllers/users";
import { validate } from '../utils/validation'
import { body } from "express-validator";
const UserRouter = express.Router();
/**
 * Get all users.
 * 
 * @return An array of objects containing the details of all users.
 * 
 * @throws Error If the users cannot be retrieved.
 * 
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Get all users.
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
 *                     description: The ID of the user.
 *                   firstName:
 *                     type: string
 *                     description: The first name of the user.
 *                   lastName:
 *                     type: string
 *                     description: The last name of the user.
 *                   password:
 *                     type: string
 *                     description: The password of the user.
 *                   email:
 *                     type: string
 *                     description: The email of the user.
 *                   image:
 *                     type: string
 *                     description: The image URL of the user.
 *                   balance:
 *                     type: number
 *                     description: The balance of the user.
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
UserRouter.get("/",  UserController.getAllUsers);

/**
 * Get a user by ID.
 * 
 * @param userId The ID of the user to retrieve.
 * @return An object containing the details of the user.
 * 
 * @throws Error If the user cannot be retrieved.
 * 
 * @swagger
 * /api/users/{userId}:
 *   get:
 *     summary: Get a user by ID
 *     description: Get the user with the specified ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user to retrieve.
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
 *                   description: The ID of the user.
 *                 firstName:
 *                   type: string
 *                   description: The first name of the user.
 *                 lastName:
 *                   type: string
 *                   description: The last name of the user.
 *                 password:
 *                   type: string
 *                   description: The password of the user.
 *                 email:
 *                   type: string
 *                   description: The email of the user.
 *                 image:
 *                   type: string
 *                   description: The image URL of the user.
 *                 balance:
 *                   type: number
 *                   description: The balance of the user.
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
UserRouter.get("/:userId(\\d+)", UserController.getUserById); 
/**
 * Update user details.
 * 
 * @param user An object containing the details of the user to update.
 * @return An object containing the updated details of the user.
 * 
 * @throws Error If the user details cannot be updated.
 * 
 * @swagger
 * /api/users/{userId}:
 *   put:
 *     summary: Update user details
 *     description: Update the details of a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: The ID of the user to update.
 *               firstName:
 *                 type: string
 *                 description: The first name of the user.
 *               lastName:
 *                 type: string
 *                 description: The last name of the user.
 *               email:
 *                 type: string
 *                 description: The email of the user.
 *               image:
 *                 type: string
 *                 description: The image URL of the user.
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
 *                   description: The ID of the user.
 *                 firstName:
 *                   type: string
 *                   description: The first name of the user.
 *                 lastName:
 *                   type: string
 *                   description: The last name of the user.
 *                 email:
 *                   type: string
 *                   description: The email of the user.
 *                 image:
 *                   type: string
 *                   description: The image URL of the user.
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
UserRouter.route(
 "/:userId(\\d+)").put(
 [
   body("email").isString().isLength({ min: 3 }).isEmail().normalizeEmail(),
   body("firstName").isString().isLength({ min: 2 }).trim(),
   body("lastName").isString().isLength({min: 2}).trim(),
   body("password")
     .isString()
     .isLength({ min: 8, max: 15 })
     .withMessage("your password should have min and max length between 8-15")
     .matches(/\d/)
     .withMessage("your password should have at least one number")
     .matches(/[!@#$%^&*(),.?“:{}|<>]/)
     .withMessage("your password should have at least one special character"),
 ],validate,
 UserController.updateUserDetails);



 
 UserRouter.route("/photo/:userId").put(UserController.takePhoto);
/**
* @swagger
* /api/users/delete/{userId}:
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
*            first_name:
*             type: string
*             required: false
*             description: update total reward
*             example: "DELETEDUSER"
*           
*     responses:
*       400:
*         description: Bad Request - required values are missing.
*       200:
*         description: User Updated
*/
UserRouter.route("/:userId(\\d+)").delete(UserController.deleteUserById);


UserRouter.put("/updateBalance", UserController.updateBalance)
export { UserRouter }; 

