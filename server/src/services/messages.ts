import {prisma} from "../utils/prisma"
import { IMessages } from "../interfaces";
const getAll = async () => {
  const allMessages: IMessages[] = await prisma.board_message.findMany({
    select: {
      id: true,
      message: true,
      created_date: true,
      boards: {
        select: {
          id: true,
          name: true
        }
      },
      user_syndicates: {
        select: {
          id: true,
          users: {
            select: {
              id: true,
              first_name: true,
              last_name: true
            }
          }
        }
      }
    }
  });
  const filteredMessages = allMessages?.filter((message) => message.message !== "deleted");

  return filteredMessages;
};


  
  async function getMessagesByBoardsId(boardsId: number) {
    let messagesByBoardsId : IMessages[];
  
    try {
      messagesByBoardsId = await prisma.board_message.findMany({
        where: {
          board_id: boardsId,
        },    select: {
          id: true,
          message: true,
          created_date: true,
          boards: {
            select: {
              id: true,
              name: true
            }
          },
          user_syndicates: {
            select: {
              id: true,
              users: {
                select: {
                  id: true,
                  first_name: true,
                  last_name: true
                }
              }
            }
          }}
      });
    } catch (error) {
      throw Error("Cannot get messages by board id", error);
    }
    const filteredMessages = messagesByBoardsId?.filter((message) => message.message !== "DELETED");

    return filteredMessages;
  }
  //creating a new message in a board



async function createMessageInBoard(message: any) {
  try {


  const newMesages = await prisma.board_message.create({
    data: {
   message: message.message,
   created_date: message.created_date,
   board_id: message.board_id,
   user_syndicate_id: message.user_syndicate_id,
 
    },
  });
    return newMesages.created_date;
  } catch(error) {
    console.log(error);
    throw Error("Cannot create message");
  }
} 
//delete message

async function deleteMessageById(messageId: number) {
  let deletedMessage;
  try {
    deletedMessage= await prisma.board_message.update({
      where: {
        id: messageId,
      },
      data: {
        message: "deleted",
        created_date: new Date(),
   
      },
    });
  } catch (error) {
    console.log(error);
  }
  return deletedMessage;
}

  const MessageService = {getAll, getMessagesByBoardsId, createMessageInBoard,deleteMessageById};
  export {MessageService};




