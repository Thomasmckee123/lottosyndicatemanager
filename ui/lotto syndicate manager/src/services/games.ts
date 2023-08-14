import axios from "../integrations/instance";
/**
 * 
 * @returns getting all syndicates 
 */
const fetchGamesBySyndicateId = async (syndicateId: number) => {
  try {
    
    const response = await axios.get(`games/syndicate/${syndicateId}`);
    return response.data;
  } catch (error) {
    console.error("There was an error!", error);
    return null;
  }
};

const fetchGamesById = async(gameId: number) => {
  try {
    const response = await axios.get(`games/${gameId}`);
    return response.data
  }catch(error){
    console.error("there was an issue getting games by id")
    return null
  }
}

const fetchGamesByTypeID = async (gameTypeId: number) => {
  try {
    const response = await axios.get(`games/gameTypes/${gameTypeId}`);
    return response.data;
  } catch (error) {
    console.error("There was an error getting the games by id:", error);
    throw error; 
  }
}
const fetchGameById = async (gameId: number) =>{
  try{
    const response = await axios.get(`games/${gameId}`)
    return response.data
  }catch(error){
    console.error("failed to get game by id");
  }
}

const createGame = async (maximumPlayers: number, treasury: number, userSyndicateId: number, gameTypeId: number) => {
console.log(treasury);

  const gameData = {
    maximumPlayers: maximumPlayers,
    treasury: 0,
    
  };

    console.log(userSyndicateId)
    console.log(gameTypeId)
    const response = await axios.post(`games/create/syndicates/${Number(userSyndicateId)}/gameTypes/${Number(gameTypeId)}`, gameData);
    console.log("RESPONSE DATA", response);
    return response.data;

};

export { fetchGamesBySyndicateId, createGame,fetchGamesById, fetchGamesByTypeID, fetchGameById} 