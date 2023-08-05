import axios from "../integrations/auth";
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

export default fetchGamesBySyndicateId 