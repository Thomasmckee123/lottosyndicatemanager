import axios from "../integrations/instance";
import TokenUtils from "../integrations/token";
//getting all the user syndicate data
const fetchBoardsAndMessagesFromSyndicates = async (boardId: Number) => {
  try {
    
    const response = await axios.get(`messages/boards/${boardId}`);
   
    return response.data;

  } catch (error) {
    console.error("There was an error!", error);
    return null;
  }}

// Update createSyndicate function to handle file
const createMessage = async (message: any, userSyndicateId: number, boardId: number) => {
  const gameData={
    message:message,
    createdDate: new Date()
  }
    const response = await axios.post(`/messages/syndicates/${userSyndicateId}/boards/${boardId}`, gameData);
    return response.data;

};





  export {fetchBoardsAndMessagesFromSyndicates, createMessage}