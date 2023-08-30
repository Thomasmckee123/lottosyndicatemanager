import axios from "../integrations/instance";
//getting all the user syndicate data
const fetchUserBySyndicateId = async (syndicateId: number) => {
  try {
    
    const response = await axios.get(`userSyndicates/syndicates/${syndicateId}`);
   console.log("Memeber DATA", response.data);
    return response.data;

  } catch (error) {
    console.error("There was an error!", error);
    return null;
  }}


  const joinSyndicate = async (startDate: Date, userId: number, syndicateId: number, roleId: number) =>{
    const createUserSyndicate = {
      startDate: startDate,
      userId: Number(userId),
      syndicateId: Number(syndicateId),
      roleId: Number(roleId)
  
    }
    const response = await axios.post(`userSyndicates/${userId}/syndicates/${syndicateId}/roles/${roleId}`,createUserSyndicate)
    return response.data
  }
  const deleteUserSyndicate = async(userSyndicateId: number)=>{
    const response = axios.delete(`userSyndicates/${userSyndicateId}`)
    return response;
  }
  const deleteUserSyndicateBySyndicateId = async(syndicateId: number)=>{
    const response = axios.delete(`userSyndicates/syndicates/${syndicateId}`)
    return response;
  }
  
  export {deleteUserSyndicateBySyndicateId, fetchUserBySyndicateId, joinSyndicate, deleteUserSyndicate}


