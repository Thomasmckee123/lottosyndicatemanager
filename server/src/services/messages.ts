import {prisma} from "../utils/prisma"
const getAll = async () => {
    return await prisma.board_message.findMany({
      select: {
        id: true,
        message: true,
        created_date: true,
        boards:{
            select :{
                id: true, 
                name: true

            },
        },
        user_syndicates:{
        select:{
            id: true,
            users:{
            select:{
            id: true,
            first_name: true,
            last_name:true,
            },
        },
        },
        },
      },
    });
  };
  
  async function getMessagesByBoardsId(boardsId: number) {
    let messagesByBoardsId;
  
    try {
      messagesByBoardsId = await prisma.board_message.findMany({
        where: {
          board_id: boardsId,
        },
        include: {
          boards: true, 
        },
      });
    } catch (error) {
      throw Error("Cannot get messages by board id", error);
    }
  
    return messagesByBoardsId;
  }
  //creating a new message in a board



async function createMessageInBoard(message: any) {
  try {


  const newMesages = await prisma.board_message.create({
    data: {
   message: message.message,
   created_date: message.created_date,

    },
  });
    return newMesages.created_date;
  } catch(error) {
    console.log(error);
    throw Error("Cannot create user");
  }
} 


  const MessageService = {getAll, getMessagesByBoardsId, createMessageInBoard};
  export {MessageService};




