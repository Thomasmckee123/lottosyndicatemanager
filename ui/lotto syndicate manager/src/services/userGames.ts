import axios from "../integrations/instance";

const fetchUserGames = async (userId: Number) => {
    try {
      
      const response = await axios.get(`userGames/userGamesByUserId/${Number(userId)}`);
     console.log("Response",response)
      return response.data;
  
    } catch (error) {
      console.error("There was an error! ", error);
      return null;
    }}


export {fetchUserGames}