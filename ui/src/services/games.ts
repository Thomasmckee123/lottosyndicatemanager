import axios from "../integrations/instance";
/**
 *
 * @returns getting all syndicates
 */
const fetchGamesBySyndicateId = async (syndicateId: number) => {
  try {
    const response = await axios.get(`games/syndicates/${syndicateId}`);
    return response.data;
  } catch (error) {
    console.error("There was an error!", error);
    return null;
  }
};

const fetchGamesById = async (gameId: number) => {
  try {
    const response = await axios.get(`games/${gameId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};



const fetchGamesByTypeID = async (gTypeId: number, syndicateId: number) => {
  try {
    console.log("fetching games by type ", gTypeId);
    const response = await axios.get(
      `games/gameTypes/${gTypeId}/syndicates/${syndicateId}`
    );
    
      return response.data
  
  } catch (error) {
    console.error("There was an error getting the games by id:", error);
  }
};

const fetchGameTypeByID = async (gTypeId: number) => {
  try {
    console.log("fetching games by type ", gTypeId);
    const response = await axios.get(`games/gameTypes/${gTypeId}`);
    return response.data;
  } catch (error) {
    console.error("There was an error getting the game types by id:", error);
  }
};
const fetchGameById = async (gameId: number) => {
  try {
    const response = await axios.get(`games/${gameId}`);
    return response.data;
  } catch (error) {
    console.error("failed to get game by id");
  }
};
const fetchArchives = async (userId: number) => {
  try {
    const response = await axios.get(`games/archivedGames/${userId}`);
    return response.data;
  } catch (error) {
    console.error("error getting response data", error);
  }
};
const createGame = async (
  treasury: number,
  syndicateId: number,
  gameTypeId: number
) => {
  console.log(treasury);
  let maximumPlayers;
  if (Number(gameTypeId) == 1) {
    maximumPlayers = 5;
  } else if (Number(gameTypeId) == 2) {
    maximumPlayers = 7;
  } else if (Number(gameTypeId) == 3) {
    maximumPlayers = 15;
  } else if (Number(gameTypeId) == 4) {
    maximumPlayers = 10;
  } else if (Number(gameTypeId) == 5) {
    maximumPlayers = 9;
  } else if (Number(gameTypeId == 6)) {
    maximumPlayers = 4;
  }
  const gameData = {
    maximumPlayers: maximumPlayers,
    treasury: 0,
  };

  console.log(syndicateId);
  console.log(gameTypeId);
  const response = await axios.post(
    `games/syndicates/${Number(syndicateId)}/gameTypes/${Number(gameTypeId)}`,
    gameData
  );
  console.log("RESPONSE DATA", response);
  return response.data;
};
const createNormalGame = async (
   gameTypeId: number,
  syndicateId: number,
 
 
) => {
  const gameData = {
    maximumPlayers: 100000000000000,
    treasury: 0,
  };

  console.log("SYNDICATE ID IIIIIII",syndicateId);
  console.log("GAMETYPEIDDDDDDD",gameTypeId);
  const response = await axios.post(
    `games/syndicates/${Number(syndicateId)}/gameTypes/${Number(gameTypeId)}`,
    gameData
  );
  console.log("RESPONSE DATA", response);
  return response.data;
};
const archiveGame = async (gameTypeId: number) => {
  try {
    const gameData = {
      maximumPlayers: 0,
    };
    const response = await axios.put(`games/archive/${gameTypeId}`, gameData);
    return response.data;
  } catch (error) {
    console.error(error);
    console.log("problem with request");
    return null;
  }
};


const fetchGameByGameId = async(gameId: number) => {
  try {
    const response = await axios.get(`games/${gameId}`);
    return response.data;
  } catch (error) {
    console.error("failed to get game by id");
  }
};

export {
  fetchGameByGameId,
  fetchArchives,
  archiveGame,
  fetchGamesBySyndicateId,
  createGame,
  fetchGamesById,
  fetchGameTypeByID,
  fetchGamesByTypeID,
  fetchGameById,
  createNormalGame,
 
};
