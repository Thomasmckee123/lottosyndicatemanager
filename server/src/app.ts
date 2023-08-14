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

import { SignupRouter } from './routers/signup';
import cors from 'cors';
import { UserSyndicatesRouter } from './routers/userSyndicates';
import { GameTypesRouter } from './routers/gameTypes';
import UserGameRouter from './routers/userGames';
const app = express();
app.use(cors());
const port = 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/health', HealthRouter);
app.use('/api/signup',SignupRouter);
app.use('/api/authenticate', AuthenticationRouter);

app.use('/api/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//app.all('*', verifyToken);

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
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
