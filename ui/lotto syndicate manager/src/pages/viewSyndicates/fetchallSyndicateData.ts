import axios from "../../integrations/auth";
/**
 * 
 * @returns getting all syndicates 
 */
const fetchAllSyndicateData = async () => {
  try {
    
    const response = await axios.get("syndicates");
    return response.data;
  } catch (error) {
    console.error("There was an error!", error);
    return null;
  }
};

export default fetchAllSyndicateData