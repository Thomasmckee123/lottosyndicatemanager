import axios from "../integrations/instance";
/**
 * 
 * @returns getting all syndicates 
 */
const fetchBoardsBySyndicateId = async (syndicateId: number) => {
  try {
    
    const response = await axios.get(`/boards/syndicate/${syndicateId}`);
    return response.data;
  } catch (error) {
    console.error("There was an error!", error);
    return null;
  }
};

export default fetchBoardsBySyndicateId 