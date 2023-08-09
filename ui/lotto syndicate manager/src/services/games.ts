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

const createGame = async (name: any, draw_date: Date, reward: number, image: any, required_ticket_number: number, user_syndicate_id: number) => {

  const gameData = {
    name: name,
    draw_date: draw_date,
    reward: reward,
    image: image, // Assuming this is already in a suitable format
    required_ticket_number: required_ticket_number,
    user_syndicate_id: user_syndicate_id,
  };

    
    const response = await axios.post(`/games/create/syndicates/${user_syndicate_id}`, gameData);
    return response.data;

};
export { fetchGamesBySyndicateId, createGame,fetchGamesById} 