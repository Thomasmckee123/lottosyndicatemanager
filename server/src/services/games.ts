import {prisma} from "../utils/prisma"
import { IGames } from "../interfaces";

const getAll = async () => {

    const allGames: IGames[] | null =  await prisma.games.findMany({
      select:{
        name: true,
        draw_date: true,
        reward: true,
        required_ticket_number: true,
        user_syndicates:{
          select:{
            start_date: true,
            users:{
              select:{
                id: true,
                first_name: true,
                last_name: true,
                email: true,  
              }
            },
            syndicates:{
              select:{
                id:true,
                created_date:true,
                name: true,
                description:true,
                avatar: true,
              }
            }
          }
        }
      }
    });
    return allGames;
  };
  
//create a game using the syndicate id

async function createGameInSyndicate(game: any) {
  try {

  const newGame = await prisma.games.create({
    data: {
  name: game.name,
  draw_date: new Date(game.draw_date),
  reward: Number(game.reward),
  required_ticket_number: game.required_ticket_number as string,
  user_syndicate_id: game.user_syndicate_id
  
    },
  });
    return newGame.draw_date;
  } catch(error) {
    console.log(error);
    throw Error("Cannot create game");
  }
} 

async function updateGames(game: any) {
  let updateGame;
  try {
    updateGame= await prisma.games.update({
      where: {
        id: game.id
      },
      data: {
      name: game.name,
      draw_date: game.draw_date,
      reward: game.reward,
      required_ticket_number: game.required_ticket_number,
      user_syndicate_id: game.user_syndicate_id

      },
    });
  } catch (error) {
    console.log(error);
  }
  return updateGame;
}
//delete game

async function deleteGameById(gameId) {
  try {
    // First, delete all messages that reference the board
    await prisma.game_user_syndicates_ticket.deleteMany({
      where: {
        game_id: gameId
      },
    });
    
    // Then, delete the board
    const deletedGame = await prisma.games.delete({
      where: {
        id: gameId
      },
    });
    
    return deletedGame;
    
  } catch (error) {
    console.error(error);
    throw error;
  }
}
  const GameService = {getAll,createGameInSyndicate,updateGames,deleteGameById};
  export {GameService};