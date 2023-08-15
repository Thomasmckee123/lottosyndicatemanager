import axios from "../integrations/instance";

/**
 * 
 * @returns get all by syndicate Id
 */
const fetchGamesWePlay = async () => {
    try {
      
      const response = await axios.get("gameTypes");
       console.log("gamesWePlayData :",response.data)
      return response.data;
     
    } catch (error) {
      console.error("There was an error!", error);
      return null;
    }
  };
/**
 * 
 * @param gameTypeId archiving a game
 */
const archiveGames = async (gameTypeId: number)=>{
  console.log("archive Id", gameTypeId)
  const gameData = {
    name: "game ended"
  }
  console.log("archive data", gameData)
  try{
  const response = await axios.put(`gameTypes/archive/${gameTypeId}`,gameData)
  console.log("archive response data", response.data)
  return response.data;
  
}catch(error){
  console.error("trouble archiving game")
  return null
}

}

const autoCreateGames = async()=>{
try{
  const response = await axios.post('gameTypes/autoCreateGames')
  return response.data
}catch(error){
console.error("couldnt auto create a game", error)
}
}
  export{archiveGames, fetchGamesWePlay, autoCreateGames}