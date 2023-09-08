import axios from "../integrations/instance";

/**
 * 
 * @returns get all by syndicate Id
 */
const fetchGamesWePlay = async () => {
    try {
      
      const response = await axios.get("gameTypes");
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

    const fixedDrawDate = new Date(drawDate)
    fixedDrawDate.setDate(fixedDrawDate.getDate()+7)
  const gameData = {
    drawDate: new Date(fixedDrawDate),
  };
  try{
  const response = await axios.put(`gameTypes/${gameTypeId}`,gameData)
  return response.data;
  
}catch(error){
  console.error("trouble archiving game")
  return null
}

}


  export{updateDates, fetchGamesWePlay, }