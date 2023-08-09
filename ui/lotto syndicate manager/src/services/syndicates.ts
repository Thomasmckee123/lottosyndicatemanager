import { start } from "repl";
import axios from "../integrations/instance";
import TokenUtils from "../integrations/token";
//getting all the user syndicate data
const fetchInsideUserSyndicateData = async (syndicateId: Number) => {
  try {
    
    const response = await axios.get(`syndicates/${syndicateId}`);
   
    return response.data;

  } catch (error) {
    console.error("There was an error!", error);
    return null;
  }
};
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


//getting the homepage syndicate data

const fetchHomePageSyndicateData = async (userId: number) => {
  try {
    const response = await axios.get(`syndicates/user/${userId}` );
    return response.data;
  } catch (error) {
    console.error("There was an error!", error);
    return null;
  }
};
// Create Syndicate


// Update createSyndicate function to handle file
const createSyndicate = async (name: any, description: any, file:any, owner_id:number) => {

  const createData ={
    createdDate: new Date().toDateString(),
    name: name,
    description: description,
    avatar: file.toString(),
    owner_id: Number(owner_id)

  }
  
    
    const response = await axios.post(`/syndicates/create/users/${owner_id}`, createData);
    return response.data;

};
const createUserSyndicate = async (start_date: Date, user_id: number, syndicate_id: number, role_id: number) =>{
  const createUserSyndicate = {
    start_date: start_date,
    user_id: Number(user_id),
    syndicate_id: Number(syndicate_id),
    role_id: Number(role_id)

  }
  const response = await axios.post(`users/${user_id}/syndicates/${syndicate_id}/roles/${role_id}`,createUserSyndicate)
  return response.data
}



export { createUserSyndicate,fetchHomePageSyndicateData, createSyndicate, fetchAllSyndicateData, fetchInsideUserSyndicateData};
