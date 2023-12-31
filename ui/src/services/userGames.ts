import axios from "../integrations/instance";

async function fetchUserGamesByUserGameId(userGameId: number){
  try{
    const response = await axios.get(`userGames/${userGameId}`)
    return response.data
  }catch(error){
    console.error("error getting user game by user game id", error)
  }

}
const fetchUserGames = async (userId: number) => {
    try {
      
      const response = await axios.get(`userGames/users/${Number(userId)}`);
      return response.data;
  
    } catch (error) {
      console.error("There was an error! ", error);
      return null;
    }}
const fetchUserGamesByGameId = async(gameId: number) =>{
  try{
    const response = await axios.get(`userGames/games/${gameId}`)
    return response.data
    
  }catch(error){
    console.error("error getting games by game Id", error)
  }
}

//updating role
const updateRole = async (userGameId: number) => {
try{
const roleData = {
  roleId: 4
}
const response = await axios.put(`userGames/${userGameId}`,roleData);
return response.data;
}catch(error){
  console.error("error updating role", error)
}



}

const updateDeposit = async (deposit, userGameId) =>{
  try{
const depositData ={
  deposit: Number(deposit),
  userGameId: Number(userGameId)
}
const response = await axios.put('userGames/',depositData)
response.data
  }catch(error){
    console.error("Error", error)
  }
}

export {updateDeposit, fetchUserGamesByUserGameId, fetchUserGames, fetchUserGamesByGameId, updateRole}