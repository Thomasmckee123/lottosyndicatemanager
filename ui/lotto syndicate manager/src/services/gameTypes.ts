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
const updateDates = async (gameTypeId: number, drawDate: Date)=>{
  console.log("archive Id", gameTypeId)

    let  fixedDrawDate = new Date(drawDate)
    fixedDrawDate.setDate(fixedDrawDate.getDate()+7)
console.log("BACK END DRAW DATE", fixedDrawDate)
console.log(fixedDrawDate)
  const gameData = {
    drawDate: new Date(fixedDrawDate),
  };
  console.log("DATE UPDATE DATA", gameData)
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
  export{updateDates, fetchGamesWePlay, autoCreateGames}