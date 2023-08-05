import axios from "../integrations/auth";
import TokenUtils from "../integrations/token";
//getting all the user syndicate data
const fetchUserBySyndicateId = async (syndicateId: Number) => {
  try {
    
    const jwt = TokenUtils.getAccessToken(); 
    const response = await axios.get(`users/userSyndicate/${syndicateId}`);
   
    return response.data;

  } catch (error) {
    console.error("There was an error!", error);
    return null;
  }}
  export {fetchUserBySyndicateId}