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
            },
          },
          syndicate_id: true,
        },
      },
    },
  });

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
      },
      syndicateId: x.games.syndicate_id,
    },
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
            },
          },
          syndicate_id: true,
        },
      },
    },
  });

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
      },

      syndicateId: x.games.syndicate_id,
    },
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
    where: { user_id: userId },
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
            },
          },

          syndicate_id: true,
        },
      },
    },
  });

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
      },
      syndicateId: x.games.game_types.id,
    },
  }));

  return modifiedUserGames;
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
            },
          },
          syndicate_id: true,
        },
      },
    },
  });

  const modifiedUserGames: IUserGames[] = userGamesById.map((x) => ({
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
      },
      syndicates_id: x.games.syndicate_id,
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

const UserGameService = {
  getAll,
  getGamesByGameId,
  createUserGame,
  getGamesBySyndicateId,
  getGamesByUserId,
  updateUserGame,
};
export default UserGameService;
