import { IUserGames } from "../interfaces";
import { prisma } from "../utils/prisma";

const getAll = async () => {
  let allUserGames = await prisma.user_games.findMany({
    select: {
      id: true,
      start_date: true,
      deposit: true,
      role_id: true,
      user_id: true,
      games: {
        select: {
          id: true,
          maximum_players: true,
          treasury: true,
          game_types: {
            select: {
              id: true,
              name: true,
              draw_date:true,
              image:true,
            },
          },
          syndicates:{
            select:{
              id:true,
              name:true,
              description:true,
              avatar:true,
              owner_id:true,
          },
        },
      },
    },
  }});

  const modifiedUserGames: any[] = allUserGames.map((x) => ({
    id: x.id,
    startDate: x.start_date,
    deposit: x.deposit,
    roleId: x.role_id,
    userId: x.user_id,
    games: {
      id: x.games.id,
      maximumPlayers: x.games.maximum_players,
      treasury: x.games.treasury,
      gameTypes: {
        id: x.games.game_types.id,
        name: x.games.game_types.name,
        drawDate:x.games.game_types.draw_date,
        image:x.games.game_types.image,
      },

      syndicates:{
        id:x.games.syndicates.id,
        name:x.games.syndicates.name,
        description:x.games.syndicates.description,
        avatar:x.games.syndicates.avatar,
        ownerId:x.games.syndicates.owner_id,
     } },
  }));
  const filteredGames = modifiedUserGames?.filter(
    (game) => game.games.maximumPlayers !== 0
  );

  return filteredGames;
};








const getGamesByUserGameId = async (userSyndicateId: number) => {
  let allUserGames = await prisma.user_games.findMany({
    where: {
      id: userSyndicateId,
    },
    select: {
      id: true,
      start_date: true,
      deposit: true,
      role_id: true,
      user_id: true,
      games: {
        select: {
          id: true,
          maximum_players: true,
          treasury: true,
          game_types: {
            select: {
              id: true,
              name: true,
              draw_date:true,
              image:true,
            },
          },
          syndicates:{
            select:{
              id:true,
              name:true,
              description:true,
              avatar:true,
              owner_id:true,
          },
        },
      },
    },
  }});

  const modifiedUserGames: any[] = allUserGames.map((x) => ({
    id: x.id,
    startDate: x.start_date,
    deposit: x.deposit,
    roleId: x.role_id,
    userId: x.user_id,
    games: {
      id: x.games.id,
      maximumPlayers: x.games.maximum_players,
      treasury: x.games.treasury,
      gameTypes: {
        id: x.games.game_types.id,
        name: x.games.game_types.name,
        drawDate:x.games.game_types.draw_date,
        image:x.games.game_types.image,
      },

      syndicates:{
        id:x.games.syndicates.id,
        name:x.games.syndicates.name,
        description:x.games.syndicates.description,
        avatar:x.games.syndicates.avatar,
        ownerId:x.games.syndicates.owner_id,
     } },
  }));
  const filteredGames = modifiedUserGames?.filter(
    (game) => game.games.maximumPlayers !== 0
  );

  return filteredGames;
};







/**
 *
 * @param syndicateId to find games in a syndicate(archives)
 * @returns
 */
const getGamesBySyndicateId = async (syndicateId) => {
  let allUserGames = await prisma.user_games.findMany({
    where: {
      id: syndicateId,
    },
    select: {
      id: true,
      start_date: true,
      deposit: true,
      role_id: true,
      user_id: true,
      games: {
        select: {
          id: true,
          maximum_players: true,
          treasury: true,
          game_types: {
            select: {
              id: true,
              name: true,
              draw_date:true,
              image:true,
            },
          },
          syndicates:{
            select:{
              id:true,
              name:true,
              description:true,
              avatar:true,
              owner_id:true,
          },
        },
      },
    },
  }});

  const modifiedUserGames: any[] = allUserGames.map((x) => ({
    id: x.id,
    startDate: x.start_date,
    deposit: x.deposit,
    roleId: x.role_id,
    userId: x.user_id,
    games: {
      id: x.games.id,
      maximumPlayers: x.games.maximum_players,
      treasury: x.games.treasury,
      gameTypes: {
        id: x.games.game_types.id,
        name: x.games.game_types.name,
        drawDate:x.games.game_types.draw_date,
        image:x.games.game_types.image,
      },

      syndicates:{
        id:x.games.syndicates.id,
        name:x.games.syndicates.name,
        description:x.games.syndicates.description,
        avatar:x.games.syndicates.avatar,
        ownerId:x.games.syndicates.owner_id,
     } },
  }));
  const filteredGames = modifiedUserGames?.filter(
    (game) => game.games.maximumPlayers !== 0
  );

  return filteredGames;
};

/**
 *
 * @param userId game relationships by user id
 * @returns
 */
const getGamesByUserId = async (userId) => {
  let allUserGames = await prisma.user_games.findMany({
    where: { user_id: userId },
    select: {
      id: true,
      start_date: true,
      deposit: true,
      roles: {
        select: {
          id: true,
          name: true,
      }}
      ,
      user_id: true,
      games: {
        select: {
          id: true,
          maximum_players: true,
          treasury: true,
          game_types: {
            select: {
              id: true,
              name: true,
              draw_date: true,
              image: true,
            },
          },

          syndicates: {
            select: {
              id: true,
              name: true,
              description: true,
              avatar: true,
              owner_id: true,
            }
        },
      },
    },
  }});

  const modifiedUserGames: any[] = allUserGames.map((x) => ({
    id: x.id,
    startDate: x.start_date,
    deposit: x.deposit,
    roles:{
      id:x.roles.id,
      name:x.roles.name,
    },
    userId: x.user_id,
    games: {
      id: x.games.id,
      maximumPlayers: x.games.maximum_players,
      treasury: x.games.treasury,
      gameTypes: {
        id: x.games.game_types.id,
        name: x.games.game_types.name,
        drawDate: x.games.game_types.draw_date,
        image: x.games.game_types.image,
      },
      syndicates: {
        id: x.games.syndicates.id,
        name: x.games.syndicates.name,
        description: x.games.syndicates.description,
        avatar: x.games.syndicates.avatar,
        ownerId: x.games.syndicates.owner_id,
      }
    },
  }));
  const filteredGames = modifiedUserGames?.filter(
    (game) => game.games.maximumPlayers !== 0
  );

  return filteredGames;
};
async function getGamesByGameId(gameId: number) {
  let userGamesById;

  userGamesById = await prisma.user_games.findMany({
    where: { games: { id: gameId } },
    select: {
      id: true,
      start_date: true,
      deposit: true,
      role_id: true,
      users:{
        select:{
          id:true,
          first_name:true,
          last_name:true,
          email:true,
          balance:true,
          image:true,
        }
      },
      games: {
        select: {
          id: true,
          maximum_players: true,
          treasury: true,
          game_types: {
            select: {
              id: true,
              name: true,
              draw_date:true,
              image:true,
            },
          },
          syndicates:{
            select:{
              id:true,
              name:true,
              description:true,
              avatar:true,
              owner_id:true,
          },
        },
      },
    },
  }});

  const modifiedUserGames: any[] = userGamesById.map((x) => ({
    id: x.id,
    startDate: x.start_date,
    deposit: x.deposit,
    roleId: x.role_id,
    users:{ 
      id:x.users.id,
      firstName:x.users.first_name,
      lastName:x.users.last_name,
      email:x.users.email,
      balance:x.users.balance,
      image:x.users.image,
    },
    games: {
      id: x.games.id,
      maximumPlayers: x.games.maximum_players,
      treasury: x.games.treasury,
      gameTypes: {
        id: x.games.game_types.id,
        name: x.games.game_types.name,
        drawDate:x.games.game_types.draw_date,
        image:x.games.game_types.image,
      },
      syndicates:{
        id:x.games.syndicates.id,
        name:x.games.syndicates.name,
        description:x.games.syndicates.description,
        avatar:x.games.syndicates.avatar,
        ownerId:x.games.syndicates.owner_id,

      }
    },
  }));

  return modifiedUserGames;
}

async function createUserGame(userGame: any) {
  console.log("create user game");
  try {
    const newUserGame = await prisma.user_games.create({
      data: {
        start_date: userGame.startDate,
        deposit: userGame.deposit,
        game_id: Number(userGame.gameId),
        role_id: Number(userGame.roleId),
        user_id: Number(userGame.userId),
      },
    });
    console.log("user game data");
    return newUserGame.start_date;
  } catch (error) {
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
async function updateRole(userGame: any) {
  let updateUserSyndicates;
  try {
    updateUserSyndicates = await prisma.user_games.update({
      where: {
        id: userGame.userGameId,
      },
      data: {
        role_id: userGame.roleId,
      },
    });
  } catch (error) {
    console.log(error);
  }
  return updateUserSyndicates;
}

 


const UserGameService = {
  getAll,
  getGamesByGameId,
  createUserGame,
  getGamesBySyndicateId,
  getGamesByUserId,
  updateUserGame,
  updateRole,
  getGamesByUserGameId
};
export default UserGameService;
