import { number } from "yup";
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

const createGame = async (name: any, drawDate: Date, reward: number, image: any, requiredTicketNumber: number, userSyndicateId: number) => {
console.log(requiredTicketNumber)
  const gameData = {
    name: name,
    drawDate: new Date(drawDate),
    reward: reward,
    image: image, 
    requiredTicketNumber: Number(requiredTicketNumber),
    //userSyndicateId: Number(userSyndicateId),
  };

    
    const response = await axios.post(`/games/create/syndicates/${userSyndicateId}`, gameData);
    return response.data;

};
export { fetchGamesBySyndicateId, createGame,fetchGamesById} 