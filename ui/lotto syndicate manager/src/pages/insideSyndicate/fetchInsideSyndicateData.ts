import axios from "axios";
import TokenUtils from "../../integrations/token";

const fetchData = async (syndicateId: Number) => {
  try {
    
    const jwt = TokenUtils.getAccessToken(); 
    const response = await axios.get(`http://localhost:3000/api/syndicates/${syndicateId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`, 
      },
    });
    console.log(response.data)
    return response.data;

  } catch (error) {
    console.error("There was an error!", error);
    return null;
  }
};

export default fetchData