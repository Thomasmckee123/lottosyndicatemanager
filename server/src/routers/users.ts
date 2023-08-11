import express from "express";
import { UserController } from "../controllers/users";
import { validate } from '../utils/validation'
import { resolver } from "./../middleware/_resolver";
import { body } from "express-validator";
import { userInfo } from "os";
const UserRouter = express.Router();

UserRouter.get("/", 
/**
   * @swagger
   * /api/users:
   *   get:
   *     summary: Retrieve all users.
   *     description: Retrieves a user object array.
   *     tags:
   *      - Users
   *     responses:
   *       200:
   *         description: A valid array of users object.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *              
   */
 UserController.getAllUsers);


UserRouter.get(/**
* @swagger
* /api/users/{id}:
*   get:
*     summary: Retrieve all users by id.
*     description: Retrieves a user object based on its id.
*     tags:
*      - users
*     parameters:
*       - in: path
*         name: id
*         required: true
*         description: Numeric ID of the user to retrieve.
*         schema:
*           type: integer
*     responses:
*       200:
*         description: A valid user object.
*         content:
*           application/json:
*             schema:
*               type: array
*               
*/"/:userId(\\d+)", UserController.getUserById); 

UserRouter.put(/**
* @swagger
* /api/users/update/{userId}:
*   put:
*     tags: 
*       - users 
*     summary: Updates an existing user
*     parameters:
*       - in: path 
*         name: userId
*         schema:
*           type: integer
*         description: The id of the requested user.
*       - in: body
*         name: updateDetails
*         description: "details to update"
*         schema:
*           type: object
*           properties:
*            first_name:
*             type: string
*             required: false
*             description: The first name for the user
*            last_name:
*             type: string
*             required: false
*             description: The last name for the user
*            email:
*             type: string
*             required: false
*             description: The email for the user
*             example: example@email.com
*            password:
*             type: string
*             required: false
*             description: The password for the user
*             example: password!1
*           
*     responses:
*       400:
*         description: Bad Request - required values are missing.
*       200:
*         description: User Updated
*/
 "/update/:userId(\\d+)",[
   body("email").isString().isLength({ min: 3 }).isEmail().normalizeEmail(),
   body("first_name").isString().isLength({ min: 2 }).trim(),
   body("last_name").isString().isLength({min: 2}).trim(),
   body("password")
     .isString()
     .isLength({ min: 8, max: 15 })
     .withMessage("your password should have min and max length between 8-15")
     .matches(/\d/)
     .withMessage("your password should have at least one number")
     .matches(/[!@#$%^&*(),.?“:{}|<>]/)
     .withMessage("your password should have at least one special character"),
 ],resolver, UserController.updateUserDetails);

UserRouter.put(/**
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
*/"/delete/:userId(\\d+)",UserController.deleteUserById);
export { UserRouter }; 

