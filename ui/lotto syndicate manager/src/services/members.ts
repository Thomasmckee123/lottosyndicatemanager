import axios from "../integrations/instance";
//getting all the user syndicate data
const fetchUserBySyndicateId = async (syndicateId: Number) => {
  try {
    
    const response = await axios.get(`users/userSyndicate/${syndicateId}`);
   
    return response.data;

  } catch (error) {
    console.error("There was an error!", error);
    return null;
  }}


  const joinSyndicate = async (start_date: Date, user_id: number, syndicate_id: number, role_id: number) =>{
    const createUserSyndicate = {
      start_date: start_date,
      user_id: Number(user_id),
      syndicate_id: Number(syndicate_id),
      role_id: Number(role_id)
  
    }
    const response = await axios.post(`users/${user_id}/syndicates/${syndicate_id}/roles/${role_id}`,createUserSyndicate)
    return response.data
  }
  
  
  export {fetchUserBySyndicateId, joinSyndicate}


