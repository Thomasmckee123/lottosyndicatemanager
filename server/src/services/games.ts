import {prisma} from "../utils/prisma"
import { IGames } from "../interfaces";

const getAll = async () => {

    const allGames =  await prisma.games.findMany({
      select:{
        id:true,
        name: true,
        draw_date: true,
        reward: true,
        image: true,
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

    const modifiedGames: IGames[] = allGames.map(
      (x: {
        id: number;
        name: string;
        draw_date: Date;
        reward: number;
        image: string;
        required_ticket_number: string;
        user_syndicates: {
          start_date: Date;
          users: {
            id: number;
            first_name: string;
            last_name: string;
            email: string;
          };
          syndicates: {
            id: number;
            created_date: Date;
            name: string;
            description: string|null;
            avatar: string|null;
          };
        }
      }) => ({
        id: x.id,
        name: x.name,
        drawDate: x.draw_date,
        reward: x.reward,
        image: x.image,
        requiredTicketNumber: x.required_ticket_number,
        userSyndicates: {
          startDate:x.user_syndicates.start_date,
          users: {
            id: x.user_syndicates.users.id,
            firstName: x.user_syndicates.users.first_name,
            lastName: x.user_syndicates.users.last_name,
            email: x.user_syndicates.users.email,
          },
          syndicates: {
            id: x.user_syndicates.syndicates.id,
            createdDate: x.user_syndicates.syndicates.created_date,
            name: x.user_syndicates.syndicates.name,
            description: x.user_syndicates.syndicates.description,
            avatar: x.user_syndicates.syndicates.avatar,
          }
        }
}))

    return modifiedGames;
  }
 

  async function getGamesByGameId(gameId :number) {
    let gamesById;
    try{
   gamesById =  await prisma.games.findUnique({
      where: {
        id: gameId
      }
    })
  }catch(error){
    console.log(error)
    throw error("couldnt get game")
  }
    return gamesById
  }
  //getting the syndicates by user id
async function getGamesBySyndicateId(syndicateId: number) {
  let gamesBySyndicateId;

  try {
    gamesBySyndicateId = await prisma.games.findMany({
      where: {
        user_syndicates: {
          syndicate_id: syndicateId
        }
      },
      select:{
        id:true,
        name: true,
        draw_date: true,
        reward: true,
        image: true,
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
    }
    );
  } catch (error) {

    throw Error("Cannot get game by syndicate Id", error);
  }
  const modifiedGames: IGames[] = gamesBySyndicateId.map(
    (x: {
      id: number;
      name: string;
      draw_date: Date;
      reward: number;
      image: string;
      required_ticket_number: string;
      user_syndicates: {
        start_date: Date;
        users: {
          id: number;
          first_name: string;
          last_name: string;
          email: string;
        };
        syndicates: {
          id: number;
          created_date: Date;
          name: string;
          description: string|null;
          avatar: string|null;
        };
      }
    }) => ({
      id: x.id,
      name: x.name,
      drawDate: x.draw_date,
      reward: x.reward,
      image: x.image,
      requiredTicketNumber: x.required_ticket_number,
      userSyndicates: {
        startDate:x.user_syndicates.start_date,
        users: {
          id: x.user_syndicates.users.id,
          firstName: x.user_syndicates.users.first_name,
          lastName: x.user_syndicates.users.last_name,
          email: x.user_syndicates.users.email,
        },
        syndicates: {
          id: x.user_syndicates.syndicates.id,
          createdDate: x.user_syndicates.syndicates.created_date,
          name: x.user_syndicates.syndicates.name,
          description: x.user_syndicates.syndicates.description,
          avatar: x.user_syndicates.syndicates.avatar,
        }
      }
}))
  return modifiedGames;

}

//create a game using the syndicate id

async function createGameInSyndicate(game: any) {
  try {

  const newGame = await prisma.games.create({
    data: {
  name: game.name,
  draw_date: game.drawDate,

  image: game.image,
  reward: Number(game.reward),
  required_ticket_number: game.requiredTicketNumber as string,
  user_syndicate_id: game.userSyndicateId
  
    },
  });
  console.log(newGame.draw_date)
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
      draw_date: game.drawDate,
      reward: game.reward,
      image: game.image,
      required_ticket_number: game.requiredTicketNumber,
      user_syndicate_id: game.userSyndicateId

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
  const GameService = {getGamesByGameId, getGamesBySyndicateId, getAll,createGameInSyndicate,updateGames,deleteGameById};
  export {GameService};