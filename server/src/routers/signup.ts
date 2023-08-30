import express from "express";
import { SignUpController } from "../controllers/signup";
import { validate } from '../utils/validation'
import { body } from "express-validator";
const SignupRouter = express.Router()
/**
 * Create a new user.
 * 
 * @param user An object containing the details of the user to create.
 * @return The email of the newly created user.
 * 
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: The first name of the user.
 *               lastName:
 *                 type: string
 *                 description: The last name of the user.
 *               email:
 *                 type: string
 *                 description: The email address of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   description: The email of the newly created user.
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
SignupRouter.post( "/",[
    body("email").isString().isLength({ min: 3 }).isEmail().normalizeEmail(),
    body("firstName").isString().isLength({ min: 2 }).trim(),
    body("lastName").isString().isLength({min: 2}).trim(),
    body("password")
      .isString()
      .isLength({ min: 8, max: 15 })
      .withMessage("your password should have min and max length between 8-15")
      .matches(/\d/)
      .withMessage("your password should have at least one number")
      .matches(/[!@#$%^&*(),.?“:{}|<>£]/)
      .withMessage("your password should have at least one special character"),
  ],
  validate, 
  SignUpController.createUser);
  export { SignupRouter }; 