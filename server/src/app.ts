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
const app = express();

const port = 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/health', HealthRouter);
app.use('/api/signup',SignupRouter);
app.use('/api/authenticate', AuthenticationRouter);

app.use('/api/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.all('*', verifyToken);
app.use('/api/users', UserRouter);
app.use('/api/syndicates',SyndicatesRouter);
app.use('/api/games',GamesRouter);
app.use('/api/boards', BoardsRouter);
app.use('/api/messages', MessagesRouter);
app.use('/api/tickets', TicketRouter);
app.use('/api/reviews',ReviewsRouter);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
