import {prisma} from "../utils/prisma"
import { IGames } from "../interfaces";
import { game_types } from "@prisma/client";
import e from "express";

const getAll = async () => {

  let allGames;
    allGames = await prisma.games.findMany({
 
      select:{
    id: true,
       maximum_players: true,
       treasury: true,
       game_types:{
        select:{
        id: true,
        name: true,
        draw_date: true,
        reward: true,
        image: true,
      ticket_cost: true}
       },
        user_syndicates:{
          select:{
            start_date: true,
            users:{
              select:{
                id: true,
                first_name: true,
                last_name: true,
                email: true,  
                balance:true
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
    
    const modifiedGames: IGames[] = allGames.map(
      (x: {
         id:number,
        maximumPlayers: number;
        treasury: number;
        game_types:{
          id: number;
          name: string;
          draw_date: Date;
          reward: number;
          image: string;
          ticket_cost: number
        }
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
      
        maximumPlayers: x.maximumPlayers,
       treasury: x.treasury,
       gameTypes: {
        id: x.game_types.id,
        name: x.game_types.name,
        drawDate: x.game_types.draw_date,
        reward: x.game_types.reward,
        image: x.game_types.image,
        ticketCost: x.game_types.ticket_cost
       },
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
  const filteredGames = modifiedGames?.filter((game) =>game.maximumPlayers  !== 0)

  return filteredGames;
}
 












  async function getGamesByGameId(gameId :number) {
    let gamesById;
    try{
   gamesById =  await prisma.games.findUnique({
      where: {
        id: gameId
      },
      select:{
           id: true,
           maximum_players: true,
           treasury: true,
           game_types:{
            select:{
            id: true,
            name: true,
            draw_date: true,
            reward: true,
            image: true,
          ticket_cost:true}
           },
            user_syndicates:{
              select:{
                start_date: true,
                users:{
                  select:{
                    id: true,
                    first_name: true,
                    last_name: true,
                    email: true,  
                    balance:true
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
        
        const modifiedGames: IGames ={ 
          id:Number(gamesById?.id),
            maximumPlayers: Number(gamesById?.maximumPlayers),
           treasury: Number(gamesById?.treasury),
           gameTypes: {
            id: Number(gamesById?.game_types.id),
            name: gamesById?.game_types?.name,
            drawDate: gamesById?.game_types?.draw_date,
            reward: Number(gamesById?.game_types?.reward),
            image: gamesById?.game_types?.image,
            ticketCost: gamesById?.game_types?.ticket_cost
           },
            userSyndicates: {
              startDate: gamesById?.user_syndicates?.start_date,
              users: {
                id: gamesById?.user_syndicates?.users.id,
                firstName: gamesById?.user_syndicates?.users?.first_name,
                lastName: gamesById?.user_syndicates.users.last_name,
                email: gamesById?.user_syndicates?.users?.email,
                balance: gamesById?.user_syndicates?.users?.balance
              },
              syndicates: {
                id: gamesById?.user_syndicates?.syndicates?.id,
                createdDate: gamesById?.user_syndicates?.syndicates?.created_date,
                name: gamesById?.user_syndicates?.syndicates.name,
                description: gamesById?.user_syndicates?.syndicates?.description,
                avatar: gamesById?.user_syndicates?.syndicates.avatar,
              }
            }
      }
       return modifiedGames
    }catch(error){
      console.error("error getting game data",error)
    
    }
  
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
    
       maximum_players: true,
       treasury: true,
       game_type_id:true,
        user_syndicates:{
          select:{
            start_date: true,
            users:{
              select:{
                id: true,
                first_name: true,
                last_name: true,
                email: true,  
                balance:true
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
      maximum_players: number;
      treasury: number;
      game_type_id:number;
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
    id:x.id,
      maximumPlayers: x.maximum_players,
     treasury: x.treasury,
     gameTypeypeId: x.game_type_id,
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
const filteredGames = modifiedGames?.filter((game) =>game.maximumPlayers  !== 0)

  return filteredGames;

}
  //getting the syndicates by user id
  async function getGamesByTypeId(gameTypeId: number, syndicateId: number) {
    let gamesByTypeId;
  
    try {
      gamesByTypeId = await prisma.games.findMany({
        where: {
            game_types: {
                id: gameTypeId 
            },
            user_syndicates: {
                syndicates: {
                    id: syndicateId 
                }
            }
        }
        ,
        select:{
      id: true,
         maximum_players: true,
         treasury: true,
         game_types:{
          select:{
          id: true,
          name: true,
          draw_date: true,
          reward: true,
          image: true,
        ticket_cost:true}
         },
          user_syndicates:{
            select:{
              start_date: true,
              users:{
                select:{
                  id: true,
                  first_name: true,
                  last_name: true,
                  email: true,  
                  balance:true
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
  
    
    const modifiedGames: IGames[] = gamesByTypeId.map(
      (x: {
         id:number,
        maximum_players: number;
        treasury: number;
        game_types:{
          id: number;
          name: string;
          draw_date: Date;
          reward: number;
          image: string,
          ticket_cost: number
        },
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
        maximumPlayers: x.maximum_players,
       treasury: x.treasury,
       gameTypes: {
        id: x.game_types.id,
        name: x.game_types.name,
        drawDate: x.game_types.draw_date,
        reward: x.game_types.reward,
        image: x.game_types.image,
        ticketCost: x.game_types.ticket_cost
       },
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
  const filteredGames = modifiedGames?.filter((game) =>game.maximumPlayers  !== 0)

    return filteredGames;
  
  }
//create a game using the syndicate id

async function archivedGames(userId: number){
  let archivedGame;
  
  try {
    archivedGame = await prisma.games.findMany({
      where: {
          
             maximum_players : 0,
             user_syndicates:{
              users:{
                id: userId
              }
             }
      }
      ,
      select:{
    id: true,
       maximum_players: true,
       treasury: true,
       game_types:{
        select:{
        id: true,
        name: true,
        draw_date: true,
        reward: true,
        image: true,
      ticket_cost:true}
       },
        user_syndicates:{
          select:{
            start_date: true,
            users:{
              select:{
                id: true,
                first_name: true,
                last_name: true,
                email: true,  
                balance:true
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
      
  const modifiedGames: IGames[] = archivedGame.map(
    (x: {
       id:number,
      maximum_players: number;
      treasury: number;
      game_types:{
        id: number;
        name: string;
        draw_date: Date;
        reward: number;
        image: string,
        ticket_cost: number
      },
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
      maximumPlayers: x.maximum_players,
     treasury: x.treasury,
     gameTypes: {
      id: x.game_types.id,
      name: x.game_types.name,
      drawDate: x.game_types.draw_date,
      reward: x.game_types.reward,
      image: x.game_types.image,
      ticketCost: x.game_types.ticket_cost
     },
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
return modifiedGames
}



async function createGameInSyndicate(game: any) {
  try {
console.log("game" + game)
console.log("game Type id" , game.gameTypeId)
  const newGame = await prisma.games.create({
    data: {
  maximum_players: Number(game.maximumPlayers),
  treasury: 0,
  user_syndicate_id: Number(game.userSyndicateId),
  game_type_id: Number(game.gameTypeId),
  
    },
  });
  console.log(newGame)
    return newGame;
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
        id: game.gameId
      },
      data: {
      
      
      treasury: Number(game.treasury),
     

      },
    });
  } catch (error) {
    console.log(error);
  }
  return updateGame;
}

  
async function archiveGames (game: any){
  let archivedGame;
  try{
  
  archivedGame = await prisma.games.update({
    where: {
      id : game.gameTypeId
    },data:{
     maximum_players: game.maximumPlayers
    }
})
  }catch(error){
    console.error(error)
  }
  return archivedGame;
}
//delete game

async function deleteGameById(gameId) {
  try {
    // First, delete all messages that reference the board
    await prisma.game_user_game_ticket.deleteMany({
      where: {
        games:{id: gameId}
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

  const GameService = {archivedGames,updateGames, getGamesByTypeId,getGamesByGameId, getGamesBySyndicateId, getAll,createGameInSyndicate,archiveGames,deleteGameById};
  export {GameService};