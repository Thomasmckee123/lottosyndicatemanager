import axios from "../integrations/instance";
const createTicket = async (ticketCode: string, gameId:number) => {
  
  
  const gameData = {
   ticketCode: ticketCode,
    totalRewardValue: 0,
    ticketStatusId: 1,
  };

      const response = await axios.post(`/tickets/games/${gameId}`, gameData);
      return response.data;
  
  };
  const getTicketsByGameId =async(gameId: number)=>{
    try{
const response = await axios(`tickets/games/${gameId}`)

return response.data
    }catch(error){
        console.error("error getting the tickets",error)
        
    }
}


export{getTicketsByGameId,createTicket}
  