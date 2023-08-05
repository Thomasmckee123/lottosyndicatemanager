import axios from "../integrations/auth";
import TokenUtils from "../integrations/token";
//getting all the user syndicate data
const fetchInsideUserSyndicateData = async (syndicateId: Number) => {
  try {
    
    const jwt = TokenUtils.getAccessToken(); 
    const response = await axios.get(`syndicates/${syndicateId}`);
   
    return response.data;

  } catch (error) {
    console.error("There was an error!", error);
    return null;
  }
};

export default fetchInsideUserSyndicateData
//getting the homepage syndicate data

const fetchHomePageSyndicateData = async (userId: number) => {
  try {
    const jwt = TokenUtils.getAccessToken(); // Get your JWT Token
    const response = await axios.get(`syndicates/user/${userId}`, {
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
// Create Syndicate


// Update createSyndicate function to handle file
const createSyndicate = async (name: any, description: any, file:any, owner_id:string) => {
  const formData = new FormData();
  formData.append("created_date", new Date().toDateString());
  formData.append('name', name);
  formData.append('description', description);
  formData.append('avatar', file.toString());

    
    const response = await axios.post(`/syndicates/create/users/${owner_id}`, formData);
    return response.data;

};




export { fetchHomePageSyndicateData, createSyndicate};
