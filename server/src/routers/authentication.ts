import express from 'express';
import { body } from 'express-validator';
import { validate } from '../utils/validation';
import { AuthController } from '../controllers/authentication';

const AuthenticationRouter = express.Router();

AuthenticationRouter.route('/').post(
  [
    body('email_address').isString().isLength({ min: 3 }).isEmail(),
    body('password').isLength({ min: 8  }),
  ],
  validate,
  AuthController.authenticate
);

export { AuthenticationRouter };