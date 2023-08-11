import axios from "../integrations/instance";
const createTicket = async (ticketCode: string, syndicateId:number, gameId:number) => {
  
  
  const gameData = {
   ticketCode: ticketCode,
    totalRewardValue: 0,
    ticketStatusId: 1,
   syndicateId: syndicateId,
   gameId: gameId
  };

      const response = await axios.post(`/tickets/syndicates/${syndicateId}/games/${gameId}`, gameData);
      return response.data;
  
  };

  export {createTicket}