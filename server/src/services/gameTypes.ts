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
        
        return modifiedGameTypes;
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

const GameTypeService ={ getAll, getGameTypeById };
export{GameTypeService}