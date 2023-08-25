import express from "express";
import { UserGameController } from "../controllers/userGames";


const UserGameRouter = express.Router()


UserGameRouter.get('/',UserGameController.getAllUserGames);
UserGameRouter.get('/games/:gameId',UserGameController.getUserGamesByGameId);
UserGameRouter.get('/syndicates/:syndicateId',UserGameController.getUserGamesBySyndicateId);
UserGameRouter.get('/users/:userId', UserGameController.getUserGamesByUserId);
UserGameRouter.post('/games/:gameId/users/:userId',UserGameController.createUserGame);
UserGameRouter.put('/',UserGameController.UpdateUserGame);









export default UserGameRouter