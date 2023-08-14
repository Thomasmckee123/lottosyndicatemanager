import axios from "../integrations/instance";
/**
 * 
 * @param startDate joining a game
 * @param deposit 
 * @param gameId 
 * @param userId 
 * @returns 
 */
const joinGame= async (startDate: Date, deposit: number, gameId: number, userId: number) =>{
    const createUserGame = {
      startDate: startDate,
      deposit: Number(deposit),
      gameId: Number(gameId),
      userId: Number(userId)
  
    }
    const response = await axios.post(`userGames/createUserGame/games/${gameId}/users/${userId}`,createUserGame)
    return response.data
  }


  const fetchmembersInGroup = async (gameId: Number) => {
    try {
      
      const response = await axios.get(`userGames/userGamesByGameId/${gameId}`);
     
      return response.data;
  
    } catch (error) {
      console.error("There was an error! ", error);
      return null;
    }}

    export {joinGame, fetchmembersInGroup}
