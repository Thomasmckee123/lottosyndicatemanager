import exp from "constants";
import { GameTypeService } from "../services/gameTypes";
import { Request, Response } from "express";

const getAllGameTypes = async (req: Request, res: Response) => {
    const gameTypes = await GameTypeService.getAll();
    return !gameTypes ? res.sendStatus(404) : res.status(200).json(gameTypes);
  };

  const getGameTypesById = async (req: Request, res: Response)=>{
    const { gameTypeId } = req.params;
  
    const gameType= await GameTypeService.getGameTypeById(Number(gameTypeId));
    return !gameType ? res.sendStatus(404) : res.status(200).json(gameType);
  }
  async function updateGameTypeStatus(req: Request, res: Response) {
    try {
      
      
      let gameDetails ={ ...req.body,
        gameTypeId: Number(req.params.gameTypeId),
      
      
      
      }
      const updatedGame = await GameTypeService.updateDates(gameDetails);
      return res.status(200).json(gameDetails);
    } catch (error) {
      res.status(500).json("Could not update Game");
    }
  }
// async function autoCreateGameTypes(req: Request, res : Response){
//   try{
  
//     let GameDetails ={
//       ...req.body ,
//        name: "Euro Millions",
//             drawDate: drawDateOneWeekLater,
//             reward:4200000000,
//             image:"https://i2-prod.gloucestershirelive.co.uk/news/cheltenham-news/article946294.ece/ALTERNATES/s1200c/1_EuroMillions.jpg",
//     }
//     const newGames = await GameTypeService.autoCreateGameTypes(GameDetails);
//     return res.status(200).json(GameDetails)
//   }catch(error){
//     res.status(500).json("could not add new games")
//   }
// }


  const GameTypesController ={getAllGameTypes, getGameTypesById, updateGameTypeStatus,}
  export default GameTypesController