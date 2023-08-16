import { IUserGames } from "../interfaces";
import { prisma } from "../utils/prisma";

const getAll = async () => {
  let allUserGames = await prisma.user_games.findMany({
    select: {
      id: true,
      start_date: true,
      deposit: true,
      user_id: true,  
      games: {
        select: {
          id: true,
          maximum_players: true,
          treasury: true,
          game_types:{
            select:{
            id: true,
            name: true,
          }},
          user_syndicates: {
            select: {
              start_date: true,
              users: {
                select: {
                  id: true,
                  first_name: true,
                  last_name: true,
                  email: true,  
                  balance: true,
                }
              },
              syndicates: {
                select: {
                  id: true,
                  created_date: true,
                  name: true,
                  description: true,
                  avatar: true,
                }
              }
            }
          }
        }
      }
    }
  });

  const modifiedUserGames: IUserGames[] = allUserGames.map((x) => ({
    id: x.id,
    startDate: x.start_date,
    deposit: x.deposit,
    userId: x.user_id,
    games: {
      id: x.games.id,
      maximumPlayers: x.games.maximum_players,
      treasury: x.games.treasury,
      gameTypes:{
      id:  x.games.game_types.id ,
      name: x.games.game_types.name,
      },
      userSyndicates: {
        startDate: x.games.user_syndicates.start_date,
        users: {
          id: x.games.user_syndicates.users.id,
          firstName: x.games.user_syndicates.users.first_name,
          lastName: x.games.user_syndicates.users.last_name,
          email: x.games.user_syndicates.users.email,
          balance: x.games.user_syndicates.users.balance
        },
        syndicates: {
          id: x.games.user_syndicates.syndicates.id,
          createdDate: x.games.user_syndicates.syndicates.created_date,
          name: x.games.user_syndicates.syndicates.name,
          description: x.games.user_syndicates.syndicates.description,
          avatar: x.games.user_syndicates.syndicates.avatar
        }
      }
    }
  }));

  return modifiedUserGames;
};

/**
 * 
 * @param syndicateId to find games in a syndicate(archives)
 * @returns 
 */
const getGamesBySyndicateId = async (syndicateId) => {
  let allUserGames = await prisma.user_games.findMany({
    where:{id:syndicateId},
    select: {
      id: true,
      start_date: true,
      deposit: true,
      user_id: true,  
      games: {
        select: {
          id: true,
          maximum_players: true,
          treasury: true,
          game_types:{
            select:{
            id: true,
            name: true,
          }},
          user_syndicates: {
            select: {
              start_date: true,
              users: {
                select: {
                  id: true,
                  first_name: true,
                  last_name: true,
                  email: true,  
                  balance: true,
                }
              },
              syndicates: {
                select: {
                  id: true,
                  created_date: true,
                  name: true,
                  description: true,
                  avatar: true,
                }
              }
            }
          }
        }
      }
    }
  });

  const modifiedUserGames: IUserGames[] = allUserGames.map((x) => ({
    id: x.id,
    startDate: x.start_date,
    deposit: x.deposit,
    userId: x.user_id,
    games: {
      id: x.games.id,
      maximumPlayers: x.games.maximum_players,
      treasury: x.games.treasury,
      gameTypes:{
      id:  x.games.game_types.id ,
      name: x.games.game_types.name,
      },
      userSyndicates: {
        startDate: x.games.user_syndicates.start_date,
        users: {
          id: x.games.user_syndicates.users.id,
          firstName: x.games.user_syndicates.users.first_name,
          lastName: x.games.user_syndicates.users.last_name,
          email: x.games.user_syndicates.users.email,
          balance: x.games.user_syndicates.users.balance
        },
        syndicates: {
          id: x.games.user_syndicates.syndicates.id,
          createdDate: x.games.user_syndicates.syndicates.created_date,
          name: x.games.user_syndicates.syndicates.name,
          description: x.games.user_syndicates.syndicates.description,
          avatar: x.games.user_syndicates.syndicates.avatar
        }
      }
    }
  }));

  return modifiedUserGames;
};

/**
 * 
 * @param userId game relationships by user id
 * @returns 
 */
const getGamesByUserId = async (userId) => {
  let allUserGames = await prisma.user_games.findMany({
    where:{user_id:userId},
    select: {
      id: true,
      start_date: true,
      deposit: true,
      user_id: true,  
      games: {
        select: {
          id: true,
          maximum_players: true,
          treasury: true,
          game_types:{
            select:{
            id: true,
            name: true,
          }},
          user_syndicates: {
            select: {
              start_date: true,
              users: {
                select: {
                  id: true,
                  first_name: true,
                  last_name: true,
                  email: true,  
                  balance: true,
                }
              },
              syndicates: {
                select: {
                  id: true,
                  created_date: true,
                  name: true,
                  description: true,
                  avatar: true,
                }
              }
            }
          }
        }
      }
    }
  });

  const modifiedUserGames: IUserGames[] = allUserGames.map((x) => ({
    id: x.id,
    startDate: x.start_date,
    deposit: x.deposit,
    userId: x.user_id,
    games: {
      id: x.games.id,
      maximumPlayers: x.games.maximum_players,
      treasury: x.games.treasury,
      gameTypes:{
      id:  x.games.game_types.id ,
      name: x.games.game_types.name,
      },
      userSyndicates: {
        startDate: x.games.user_syndicates.start_date,
        users: {
          id: x.games.user_syndicates.users.id,
          firstName: x.games.user_syndicates.users.first_name,
          lastName: x.games.user_syndicates.users.last_name,
          email: x.games.user_syndicates.users.email,
          balance: x.games.user_syndicates.users.balance
        },
        syndicates: {
          id: x.games.user_syndicates.syndicates.id,
          createdDate: x.games.user_syndicates.syndicates.created_date,
          name: x.games.user_syndicates.syndicates.name,
          description: x.games.user_syndicates.syndicates.description,
          avatar: x.games.user_syndicates.syndicates.avatar
        }
      }
    }
  }));

  return modifiedUserGames;
};
async function getGamesByGameId(gameId: number){
  let userGamesById;
  try {
    userGamesById = await prisma.user_games.findMany({
      where: { games:{id: gameId,} }, 
      select: {
        id: true,
        start_date: true,
        deposit: true,
        user_id: true,  
        games: {
          select: {
            id: true,
            maximum_players: true,
            treasury: true,
            game_type_id: true,
            user_syndicates: {
              select: {
                start_date: true,
                users: {
                  select: {
                    id: true,
                    first_name: true,
                    last_name: true,
                    email: true,  
                    balance: true,
                  }
                },
                syndicates: {
                  select: {
                    id: true,
                    created_date: true,
                    name: true,
                    description: true,
                    avatar: true,
                  }
                }
              }
            }
          }
        }
      }
    });
  
    const modifiedUserGames: IUserGames[] = userGamesById.map((x) => ({
      id: x.id,
      startDate: x.start_date,
      deposit: x.deposit,
      userId: x.user_id,
      games: {
        id: x.games.id,
        maximumPlayers: x.games.maximum_players,
        treasury: x.games.treasury,
        gameType:{
          id: x.games.gameType.id,
          name:x.games.gameType.name
        },
        userSyndicates: {
          startDate: x.games.user_syndicates.start_date,
          users: {
            id: x.games.user_syndicates.users.id,
            firstName: x.games.user_syndicates.users.first_name,
            lastName: x.games.user_syndicates.users.last_name,
            email: x.games.user_syndicates.users.email,
            balance: x.games.user_syndicates.users.balance
          },
          syndicates: {
            id: x.games.user_syndicates.syndicates.id,
            createdDate: x.games.user_syndicates.syndicates.created_date,
            name: x.games.user_syndicates.syndicates.name,
            description: x.games.user_syndicates.syndicates.description,
            avatar: x.games.user_syndicates.syndicates.avatar
          }
        }
      }
    }));
    console.log()
    return modifiedUserGames;
  } catch (error) {
    console.error("error with server")
    throw error;
  }
}

async function createUserGame(userGame: any) {
  try {
  


  const newUserGame = await prisma.user_games.create({

    data: {
start_date: userGame.startDate,
deposit: userGame.deposit,
game_id: Number(userGame.gameId),
user_id: Number(userGame.userId),
    },
  });
  console.log("user game data")
    return newUserGame.start_date;
  } catch(error) {
    console.log(error);
    throw Error("Cannot create user");
  }
} 

async function updateUserGame(userGame: any) {
  let updateUserSyndicates;
  try {
    updateUserSyndicates = await prisma.user_games.update({
      where: {
        id: userGame.id,
      },
     data: {
      
      deposit: userGame.deposit,
      
    }, 
    });
  } catch (error) {
    console.log(error);
  }
  return updateUserSyndicates;
}


const UserGameService = {getAll, getGamesByGameId, createUserGame, getGamesBySyndicateId, getGamesByUserId, updateUserGame};
export default UserGameService