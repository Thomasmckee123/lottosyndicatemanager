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

const fetchUserRelationship = async (userSyndicateId: number)=>{
  try{
    const response = await axios.get(`userSyndicates/userSyndicatesById/${userSyndicateId}`);
return response.data;
  } catch(error){
    console.error("There was an error")
    return null
  }
}
const createNewBoard = async (name: any, syndicateId: number ) => {

  const boardData = {
    name: name,
    syndicateId: syndicateId
   
  };

    
    const response = await axios.post(`/boards/create/syndicates/${syndicateId}`, boardData);
    return response.data;

};
const updateUserRole = async (userSyndicateId: number, roleId: number)=>{
  const updateData ={
    roleId : Number(roleId)
  }
  const response = await axios.put(`/userSyndicates/updateRole/${userSyndicateId}`,updateData);
  return response.data
}
export {updateUserRole, createNewBoard, fetchBoardsBySyndicateId, fetchUserRelationship}