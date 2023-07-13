import express from 'express';
import {HealthRouter} from './routers/health';
import { UserRouter } from './routers/users';
import { SyndicatesRouter } from './routers/syndicates';
import { GamesRouter } from './routers/games';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api/health', HealthRouter);
app.use('/api/users', UserRouter);
app.use('/api/syndicates',SyndicatesRouter);
app.use('/api/games',GamesRouter);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
