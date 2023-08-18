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
};
const createNewBoard = async ( gameId: number ) => {

  const boardData = {
    name: "new game board",

   
  };


    
    const response = await axios.post(`/boards/create/games/${gameId}`, boardData);
    return response.data;

};
const updateUserRole = async (userSyndicateId: number, roleId: number)=>{
  const updateData ={
    roleId : Number(roleId)
  }
  const response = await axios.put(`/userSyndicates/updateRole/${userSyndicateId}`,updateData);
  return response.data
}


const updateBoards = async(boardId: number, name: string) =>{
  const updateData = {
   name: name
  }
  const response = await axios.put(`boards/update/${boardId}`,updateData)
  return response.data;
}
export {updateBoards,updateUserRole, createNewBoard, fetchBoardsBySyndicateId, fetchUserRelationship}