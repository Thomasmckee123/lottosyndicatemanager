import axios from "../integrations/instance";


const updateBalance = async (userId: number, balance: number)=>{

  console.log("balance ", balance);
    const updateData ={
      balance : Number(balance)
    }
    const response = await axios.put(`/users/updateBalance/${userId}`,updateData);
    return response.data
  }
  const updateTreasury = async(treasury: number, gameId: number)=>{
   try{
   const treasuryData = {
        treasury: Number(treasury)
      }
      console.log('treasury data   ',treasuryData)
      console.log("gameId", gameId)

    
const response = await axios.put(`games/update/${gameId}`, treasuryData)
return response.data}catch(error){
  console.error(error)
  return null
}
  }



  
  export {updateBalance, updateTreasury}