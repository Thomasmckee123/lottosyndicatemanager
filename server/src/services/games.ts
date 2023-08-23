import { prisma } from "../utils/prisma";
import { IGames } from "../interfaces";
import { game_types } from "@prisma/client";
import e from "express";

const getAll = async () => {
  let allGames;
  allGames = await prisma.games.findMany({
    select: {
      id: true,
      maximum_players: true,
      treasury: true,
      game_types: {
        select: {
          id: true,
          name: true,
          draw_date: true,
          reward: true,
          image: true,
          ticket_cost: true,
        },
      },
      syndicate_id: true,
    },
  });

  const modifiedGames: IGames[] = allGames.map(
    (x: {
      id: number;
      maximum_players: number;
      treasury: number;
      game_types: {
        id: number;
        name: string;
        draw_date: Date;
        reward: number;
        image: string;
        ticket_cost: number;
      };
      syndicate_id: number;
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
        ticketCost: x.game_types.ticket_cost,
      },
      syndicateId: x.syndicate_id,
    })
  );
  const filteredGames = modifiedGames?.filter(
    (game) => game.maximumPlayers !== 0
  );

  return filteredGames;
};

async function getGamesByGameId(gameId: number) {
  let gamesById;

  gamesById = await prisma.games.findUnique({
    where: {
      id: gameId,
    },
    select: {
      id: true,
      maximum_players: true,
      treasury: true,
      game_types: {
        select: {
          id: true,
          name: true,
          draw_date: true,
          reward: true,
          image: true,
          ticket_cost: true,
        },
      },
      syndicate_id: true,
    },
  });

  const modifiedGames = {
    id: gamesById?.id,
    maximumPlayers: gamesById?.maximum_players,
    treasury: gamesById?.treasury,
    gameTypes: {
      id: gamesById?.game_types.id,
      name: gamesById?.game_types.name,
      drawDate: gamesById?.game_types.draw_date,
      reward: gamesById?.game_types.reward,
      image: gamesById?.game_types.image,
      ticketCost: gamesById?.game_types.ticket_cost,
    },
  };
  return modifiedGames;
}

//getting the syndicates by user id
async function getGamesBySyndicateId(syndicateId: number) {
  let gamesBySyndicateId;

  gamesBySyndicateId = await prisma.games.findMany({
    where: {
      syndicate_id: syndicateId,
    },
    select: {
      id: true,
      maximum_players: true,
      treasury: true,
      game_types: {
        select: {
          id: true,
          name: true,
          draw_date: true,
          reward: true,
          image: true,
          ticket_cost: true,
        },
      },
      syndicate_id: true,
    },
  });

  const modifiedGames: IGames[] = gamesBySyndicateId.map(
    (x: {
      id: number;
      maximum_players: number;
      treasury: number;
      game_types: {
        id: number;
        name: string;
        draw_date: Date;
        reward: number;
        image: string;
        ticket_cost: number;
      };
      syndicate_id: number;
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
        ticketCost: x.game_types.ticket_cost,
      },
      syndicateId: x.syndicate_id,
    })
  );
  const filteredGames = modifiedGames?.filter(
    (game) => game.maximumPlayers !== 0
  );

  return filteredGames;
}

//getting the syndicates by user id
async function getGamesByTypeId(gameTypeId: number, syndicateId: number) {
  let gamesByTypeId;

  gamesByTypeId = await prisma.games.findMany({
    where: {
      game_types: {
        id: gameTypeId,
      },

      syndicate_id: syndicateId,
    },
    select: {
      id: true,
      maximum_players: true,
      treasury: true,
      game_types: {
        select: {
          id: true,
          name: true,
          draw_date: true,
          reward: true,
          image: true,
          ticket_cost: true,
        },
      },
      user_games: true,
      syndicate_id: true,
    },
  });

  const modifiedGames: IGames[] = gamesByTypeId.map(
    (x: {
      id: number;
      maximum_players: number;
      treasury: number;
      game_types: {
        id: number;
        name: string;
        draw_date: Date;
        reward: number;
        image: string;
        ticket_cost: number;
      };
      user_games: any[];
      syndicate_id: number;
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
        ticketCost: x.game_types.ticket_cost,
      },
      userGames: x.user_games,
      syndicateId: x.syndicate_id,
    })
  );
  const filteredGames = modifiedGames?.filter(
    (game) => game.maximumPlayers !== 0
  );

  return filteredGames;
}
//create a game using the syndicate id

async function archivedGames(userId: number) {
  let archivedGame;

  archivedGame = await prisma.games.findMany({
    where: {
      maximum_players: 0,
    },
    select: {
      id: true,
      maximum_players: true,
      treasury: true,
      game_types: {
        select: {
          id: true,
          name: true,
          draw_date: true,
          reward: true,
          image: true,
          ticket_cost: true,
        },
      },
      syndicate_id: true,
    },
  });

  const modifiedGames: IGames[] = archivedGame.map(
    (x: {
      id: number;
      maximum_players: number;
      treasury: number;
      game_types: {
        id: number;
        name: string;
        draw_date: Date;
        reward: number;
        image: string;
        ticket_cost: number;
      };
      syndicate_id: number;
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
        ticketCost: x.game_types.ticket_cost,
      },
      syndicateId: x.syndicate_id,
    })
  );
  const filteredGames = modifiedGames?.filter(
    (game) => game.maximumPlayers !== 0
  );

  return filteredGames;
}

async function createGameInSyndicate(game: any) {
  try {
    console.log("game" + game);
    console.log("game Type id", game.gameTypeId);
    const newGame = await prisma.games.create({
      data: {
        maximum_players: Number(game.maximumPlayers),
        treasury: 0,
        syndicate_id: Number(game.syndicateId),
        game_type_id: Number(game.gameTypeId),
      },
    });
    console.log(newGame);
    return newGame;
  } catch (error) {
    console.log(error);
    throw Error("Cannot create game");
  }
}

async function updateGames(game: any) {
  let updateGame;
  try {
    updateGame = await prisma.games.update({
      where: {
        id: game.gameId,
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

async function archiveGames(game: any) {
  let archivedGame;
  try {
    archivedGame = await prisma.games.update({
      where: {
        id: game.gameTypeId,
      },
      data: {
        maximum_players: game.maximumPlayers,
      },
    });
  } catch (error) {
    console.error(error);
  }
  return archivedGame;
}

const GameService = {
  archivedGames,
  updateGames,
  getGamesByTypeId,
  getGamesByGameId,
  getGamesBySyndicateId,
  getAll,
  createGameInSyndicate,
  archiveGames,
};
export { GameService };
