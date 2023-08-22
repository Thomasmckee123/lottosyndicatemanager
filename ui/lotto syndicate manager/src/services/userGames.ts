import axios from "../integrations/instance";

const fetchUserGames = async (userId: Number) => {
    try {
      
      const response = await axios.get(`userGames/users/${Number(userId)}`);
     console.log("Response",response)
      return response.data;
  
    } catch (error) {
      console.error("There was an error! ", error);
      return null;
    }}
const fetchUserGamesByGameId = async(gameId: number) =>{
  try{
    console.log("USER GAME GAME ID", gameId)
    const response = await axios.get(`userGames/games/${gameId}`)
    console.log("USER GAME RESPONSE", response)
    return response.data
    
  }catch(error){
    console.error("error getting games by game Id", error)
  }
}

export {fetchUserGames, fetchUserGamesByGameId}