import axios from "../integrations/instance";
import TokenUtils from "../integrations/token";
const createTicket = async (ticket_code: string, syndicateId:number, gameId:number) => {
    const formData = new FormData();
    formData.append("ticket code", ticket_code);
    formData.append('total_reward_value', "0");
    formData.append('ticket_status_id', "1")
  
  const gameData = {
   ticket_code: ticket_code,
    total_reward_value: 0,
    ticket_status_id: 1,
   syndicateId: syndicateId,
   gameId: gameId
  };

      const response = await axios.post(`/tickets/syndicates/${syndicateId}/games/${gameId}`, gameData);
      return response.data;
  
  };

  export {createTicket}