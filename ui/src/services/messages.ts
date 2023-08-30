import axios from "../integrations/instance";
const fetchingMessagesByGameId = async(gameId: number)=>{try{
const response = await axios.get(`boards/games/${gameId}`);

return response.data
}catch(error){
  console.error("error getting messages by game id")
}
}


const fetchingMessagesByBoardId = async(boardId: number)=>{
  try{
  const response = await axios.get(`messages/boards/${boardId}`)
  return response.data
  }catch(error){
    console.error(error)
  }
}






// Update createSyndicate function to handle file
const createMessage = async (message: string, userGameId: number, boardId: number) => {
  try{
  const gameData={
    message:message,
    createdDate: new Date()
  }
    const response = await axios.post(`/messages/games/${userGameId}/boards/${boardId}`, gameData);
    return response.data;
  }catch(error){
    console.error("couldnt create message")
  }
};





  export {createMessage, fetchingMessagesByGameId, fetchingMessagesByBoardId}