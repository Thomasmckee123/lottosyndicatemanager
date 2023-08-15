import { prisma } from "../utils/prisma";
import { IGames } from "../interfaces";
import { IGameTypes } from "../interfaces/games";
import { idText } from "typescript";

const getAll = async () => {
    try {
        const allGames = await prisma.game_types.findMany({
            select: {
                id: true,
                name: true,
                draw_date: true,
                reward: true,
                image: true,
            }
        });
        
        const modifiedGameTypes: IGameTypes[] = allGames.map((x) => ({
            id: x.id,
            name: x.name,
            drawDate: x.draw_date,
            reward: x.reward,
            image: x.image
        }));
        const filteredgameTypes = modifiedGameTypes?.filter((modifiedGameTypes) => modifiedGameTypes.name!== "game ended")
        return filteredgameTypes;
    } catch (error) {
        console.error("Error fetching all games:", error);
        return null;
    }

};

const getGameTypeById = async(gameTypeId: number) =>{
let gameTypeById = await  prisma.game_types.findUnique({
  where:{id:gameTypeId},
  select: {
    id: true,
    name: true,
    draw_date: true,
    reward: true,
    image: true,
}
})
  const newModifiedGameTypes ={
    id: gameTypeById?.id,
    name: gameTypeById?.name,
    drawDate: gameTypeById?.draw_date,
    reward: gameTypeById?.reward,
    image:gameTypeById?.image
  }

return newModifiedGameTypes;
}
/**
 * 
 * @param gameTypes updating the gameTypes, archiving them
 * @returns 
 */
async function archiveGames(gameTypes: any) {
    let updateGameTypes;
    try {
      updateGameTypes = await prisma.game_types.update({
        where: {
          id: gameTypes.gameTypeId,
        },
        data: {
      name: gameTypes.name
        },          

      });
    } catch (error) {
      console.log(error);
    }
    return updateGameTypes;
  }


  async function autoCreateGameTypes(gameData) {
    let createGames;
    try {
       
        createGames = await prisma.game_types.create({
        data:{
            name: gameData.name,
            draw_date: gameData.drawDate,
            reward:gameData.reward,
            image:gameData.image,
    }})
    }catch(error){
        console.error("error creating new game types")
    }
  }
const GameTypeService ={ getAll, getGameTypeById, archiveGames, autoCreateGameTypes};
export{GameTypeService}