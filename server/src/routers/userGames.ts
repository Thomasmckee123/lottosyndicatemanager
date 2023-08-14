import express from "express";
import { UserGameController } from "../controllers/userGames";


const UserGameRouter = express.Router()


UserGameRouter.get('/',UserGameController.getAllUserGames);
UserGameRouter.get('/userGamesByGameId/:gameId',UserGameController.getUserGamesByGameId);
UserGameRouter.get('/userGamesBySyndicateId/:syndicateId',UserGameController.getUserGamesBySyndicateId);
UserGameRouter.get('/userGamesByUserId/:userId', UserGameController.getUserGamesByUserId);
UserGameRouter.post('/createUserGame/games/:gameId/users/:userId',UserGameController.createUserGame);
UserGameRouter.post('/updateUserGame',UserGameController.UpdateUserGame);









export default UserGameRouter