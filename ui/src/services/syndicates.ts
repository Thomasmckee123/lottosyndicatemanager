import axios from "../integrations/instance";
//getting all the user syndicate data
const fetchInsideUserSyndicateData = async (syndicateId: number) => {
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
// eslint-disable-next-line @typescript-eslint/ban-ts-comment

const createSyndicate = async (name: string, description: string, file:File, ownerId:number) => {

  const createData ={
    createdDate: new Date().toDateString(),
    name: name,
    description: description,
    ownerId: Number(ownerId)

  }

    
    const response = await axios.post(`/syndicates/users/${ownerId}`, createData);
    uploadSyndicateImage(Number(response.data), file)
   // addSyndicateImage(Number(response.data)) 
    return response.data;

};

// const addSyndicateImage = async (syndicateId: number) => {
 
//   await axios.put(`syndicates/photo/${syndicateId}`)
  
// }
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
const uploadSyndicateImage = async(syndicateId: number, images:File) =>{
  try{
      const formData = new FormData();
      formData.append('file', images);

      const response = await axios.post(`/images/syndicates/${syndicateId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
  }catch(error){
      console.error("error updating photo", error);
  }
  }   


export {uploadSyndicateImage,fetchSyndicateByName,createUserSyndicate,fetchHomePageSyndicateData, createSyndicate, fetchAllSyndicateData, fetchInsideUserSyndicateData};
