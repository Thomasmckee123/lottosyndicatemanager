import axios from "../integrations/instance";

/**
 * 
 * @returns get all by syndicate Id
 */
const fetchGamesWePlay = async () => {
    try {
      
      const response = await axios.get("gameTypes");
      return response.data;
      console.log(response.data)
    } catch (error) {
      console.error("There was an error!", error);
      return null;
    }
  };

  export{fetchGamesWePlay}