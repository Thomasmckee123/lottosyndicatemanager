import express from "express";
import { SignUpController } from "../controllers/signup";
import { validate } from '../utils/validation'
import { body } from "express-validator";
const SignupRouter = express.Router()

SignupRouter.post( /**
* @swagger
* api/users/create/{id}:
*   post:
*     summary: Create a new user.
*     description: Creates a new user object.
*     tags:
*      - create
*     parameters:
*       - in: body
*         name: userDetails
*         required: true
*         description: User details for signing up.
*         schema:
*           type: object
*           items:
*               user_name:
*                type: string
*                description: The user's name.
*                example: John Graham
*               email:
*                type: string
*                description: The user's email.
*                example: example@mail.com
*               user_password:
*                type: string
*                description: The user's password.
*                example: password1@
*     responses:
*       201:
*         description: Created a new user.
*         content:
*           application/json:
*             schema:
*               type: array
*               
*/"/",[
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
  ],
  validate, 
  SignUpController.createUser);
  export { SignupRouter }; 