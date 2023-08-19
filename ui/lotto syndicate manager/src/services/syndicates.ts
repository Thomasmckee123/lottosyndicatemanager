import axios from "../integrations/instance";
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

const fetchSyndicateByName = async(name: string)=>{
  try{
const response = await axios.get(`syndicates/name/${name}`)
return response.data;
  }catch(error){
    console.error("error fetching syndicate by name")
  }
}
//getting the homepage syndicate data

const fetchHomePageSyndicateData = async (userId: number) => {
  try {
    const response = await axios.get(`userSyndicates/user/${userId}` );
    return response.data;
  } catch (error) {
    console.error("There was an error!", error);
    return null;
  }
};
// Create Syndicate



export default fetchAllSyndicateData
// Update createSyndicate function to handle file
const createSyndicate = async (name: any, description: any, file:any, ownerId:number) => {

  const createData ={
    createdDate: new Date().toDateString(),
    name: name,
    description: description,
    avatar: file.toString(),
    ownerId: Number(ownerId)

  }
  
    
    const response = await axios.post(`/syndicates/create/users/${ownerId}`, createData);
    return response.data;

};
const createUserSyndicate = async (startDate: Date, userId: number, syndicateId: number, roleId: number) =>{
  const createUserSyndicate = {
    startDate: startDate,
    userId: Number(userId),
    syndicateId: Number(syndicateId),
    roleId: Number(roleId)

  }
  const response = await axios.post(`userSyndicates/${userId}/syndicates/${syndicateId}/roles/${roleId}`,createUserSyndicate)
  return response.data
}



export {fetchSyndicateByName,createUserSyndicate,fetchHomePageSyndicateData, createSyndicate, fetchAllSyndicateData, fetchInsideUserSyndicateData};
