import express from 'express';
import {HealthRouter} from './routers/health';
import { UserRouter } from './routers/users';
import { SyndicatesRouter } from './routers/syndicates';
import { GamesRouter } from './routers/games';
import { BoardsRouter } from './routers/boards';
import {MessagesRouter} from './routers/messages';
import { TicketRouter } from './routers/tickets';
import { ReviewsRouter } from './routers/reviews';
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "../swaggerConfig";
import bodyParser from 'body-parser';
import { verifyToken } from './middleware/authentication';
import { AuthenticationRouter } from './routers/authentication';
import fileUpload from  "express-fileupload";
import { SignupRouter } from './routers/signup';
import cors from 'cors';
import { UserSyndicatesRouter } from './routers/userSyndicates';
import { GameTypesRouter } from './routers/gameTypes';
import UserGameRouter from './routers/userGames';
import { ImageRouter } from './routers/images';
const app = express();
app.use(cors());
const port = 3000;

app.use(express.json());
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(function (req, res, next) {
  res.setHeader("Content-Type", "application/json");
  next();
});

app.use('/api/health', HealthRouter);
app.use('/api/signup',SignupRouter);
app.use('/api/authenticate', AuthenticationRouter);


app.all('*', verifyToken);
app.use('/api/images', ImageRouter)
app.use('/api/users', UserRouter);
app.use('/api/syndicates',SyndicatesRouter);
app.use('/api/games',GamesRouter);
app.use('/api/boards', BoardsRouter);
app.use('/api/messages', MessagesRouter);
app.use('/api/tickets', TicketRouter);
app.use('/api/reviews',ReviewsRouter);
app.use('/api/userSyndicates',UserSyndicatesRouter);
app.use('/api/gameTypes',GameTypesRouter);
app.use('/api/userGames',UserGameRouter)


export { app };