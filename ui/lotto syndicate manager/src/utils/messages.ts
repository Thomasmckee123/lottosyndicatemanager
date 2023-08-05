import axios from "../integrations/auth";
import TokenUtils from "../integrations/token";
//getting all the user syndicate data
const fetchBoardsAndMessagesFromSyndicates = async (syndicateId: Number) => {
  try {
    
    const jwt = TokenUtils.getAccessToken(); 
    const response = await axios.get(`boards/syndicate/${syndicateId}`);
   
    return response.data;

  } catch (error) {
    console.error("There was an error!", error);
    return null;
  }}

// Update createSyndicate function to handle file
const createMessage = async (message: any, user_syndicate_id: number, board_id: number) => {
  const formData = new FormData();
  formData.append('message', message);
  const dateStr = new Date().toISOString().split('T')[0];
  formData.append("created_date", dateStr);
  
  

  

    
    const response = await axios.post(`/messages/syndicates/${user_syndicate_id}/boards/${board_id}`, formData);
    return response.data;

};





  export {fetchBoardsAndMessagesFromSyndicates, createMessage}