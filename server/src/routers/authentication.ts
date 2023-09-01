import express from 'express';
import { body } from 'express-validator';
import { validate } from '../utils/validation';
import { AuthController } from '../controllers/authentication';

const AuthenticationRouter = express.Router();
/**
 * @swagger
 * /authenticate:
 *   post:
 *     tags: [
 *       authenticate
 *     ]
 *     summary: Authenticates a user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email_address:
 *                 type: string
 *                 required: true
 *                 description: The email address for the user
 *               password:
 *                 type: string
 *                 required: true
 *                 description: The password of the user
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       201:
 *         description: User Authenticated
 */
AuthenticationRouter.route('/').post(
  [
   body('emailAddress').isString().isLength({ min: 3 }).isEmail(),
    body('password').isLength({ min: 8  }),
  ],
  validate,
  AuthController.authenticate
);

/**
 * @swagger
 * /api/authenticate/refresh:
 *   get:
 *     tags: [
 *       Authenticate
 *     ]
 *     summary: if validated return token
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Error
 */
AuthenticationRouter.route("/refresh").get(AuthController.refresh);

export { AuthenticationRouter };