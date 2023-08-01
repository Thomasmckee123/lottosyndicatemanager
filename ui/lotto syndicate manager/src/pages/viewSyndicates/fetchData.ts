import axios from "axios";
import TokenUtils from "../../integrations/token";

const fetchData = async () => {
  try {
    
    const jwt = TokenUtils.getAccessToken(); // Get your JWT Token
    const response = await axios.get("http://localhost:3000/api/syndicates", {
      headers: {
        Authorization: `Bearer ${jwt}`, // Pass your JWT in the Authorization Header
      },
    });
    return response.data;
  } catch (error) {
    console.error("There was an error!", error);
    return null;
  }
};

export default fetchData