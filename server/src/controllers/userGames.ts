import { Request, Response } from "express";
import UserGameService from "../services/userGames";

const getAllUserGames = async (req: Request, res: Response) => {
    try{
    const gameUsers = await UserGameService.getAll();
    return !gameUsers ? res.sendStatus(404) : res.status(200).json(gameUsers);
  }catch
  { 
   return res.sendStatus(500).json("issue getting userGames by Id")}
  };
  const getUserGamesBySyndicateId = async (req: Request, res: Response) => {
    try {
      const syndicateId = req.params.syndicateId;
      const gameUsersBySyndicateId = await UserGameService.getGamesBySyndicateId(Number(syndicateId));
  
      if (!gameUsersBySyndicateId) {
        return res.sendStatus(404);
      }
  
      return res.status(200).json(gameUsersBySyndicateId);
    } catch (error) {
      console.error(error);
      return res.sendStatus(500);
    }
  };
const getUserGamesByUserGameId = async (req: Request, res: Response) => {
  try {
    const userGameId = req.params.userGameId;
    const gameUsersByUserGameId = await UserGameService.getGamesByUserGameId(Number(userGameId));

    if (!gameUsersByUserGameId) {
      return res.sendStatus(404);
    }

    return res.status(200).json(gameUsersByUserGameId);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};
const getUserGamesByGameId = async(req: Request, res: Response) => {
    try {
        const { gameId }  = req.params;
        const userGamesByGameId = await UserGameService.getGamesByGameId(Number(gameId));
        
        if (!userGamesByGameId) {
            return res.sendStatus(404);
        } else {
            return res.status(200).json(userGamesByGameId);
        }
    } catch (error) {
        console.error("Error fetching user games by game ID:", error); // Log the actual error for debugging
        return res.status(500).json({ message: "Issue getting games by game Id" });
    }
}

const getUserGamesByUserId = async(req: Request, res: Response) => {
  try {
      const userId = Number(req.params.userId); // Ensure you extract the userId from the params
      const userGamesByUserId = await UserGameService.getGamesByUserId(userId);
      
      if (!userGamesByUserId) {
          return res.sendStatus(404);
      }
      
      return res.status(200).json(userGamesByUserId);
  } catch (error) {
      console.error("Error:", error); // For debugging
      return res.status(500).json("Issue getting the games by gameId");
  }
}

/**
 * 
 * @param req create User Game
 * @param res 
 * @returns 
 */
const createUserGame = async(req: Request, res: Response)=>{

        try {
          
            const newUserGame = {

startDate: new Date(),
deposit: Number(req.body.deposit),
roleId: Number(req.body.roleId),
gameId: req.params.gameId,
userId: req.params.userId,
            }
             console.log(newUserGame)
              
                const createNewUserGame = await UserGameService.createUserGame(newUserGame);
                return res.status(200).json(createNewUserGame);
              } catch (error) {
                res.status(500).json("Could not create game.");
               
              }
            }
    
//update syndicate details
async function UpdateUserGame(req: Request, res: Response) {
    try {
      
      let gameDetails={
        
        deposit: Number(req.body.deposit),
         id: Number(req.body.userGameId),
       
        
  
      }
    
      const updatedUserGame= await UserGameService.updateUserGame(gameDetails);
      return res.status(200).json(updatedUserGame);
    } catch (error) {
      res.status(500).json("Could not update user.");
    }
  }

  async function UpdateUserRole(req: Request, res: Response) {
    try {
      
      let gameDetails={
        userGameId: Number(req.params.userGameId),

        roleId: Number(req.body.roleId),
   
       
        
  
      }
    
      const updatedUserGame= await UserGameService.updateRole(gameDetails);
      return res.status(200).json(updatedUserGame);
    } catch (error) {
      res.status(500).json("Could not update user.");
    }
  }
  const UserGameController = {getUserGamesByUserGameId, UpdateUserRole, UpdateUserGame, createUserGame, getUserGamesByUserId, getAllUserGames, getUserGamesBySyndicateId, getUserGamesByGameId}
  export{UserGameController}