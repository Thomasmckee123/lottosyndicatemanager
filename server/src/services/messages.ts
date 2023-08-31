import {prisma} from "../utils/prisma"
import { IMessages } from "../interfaces";
const getAll = async () => {
  const allMessages = await prisma.board_message.findMany({
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
      user_games: {
        select: {
          id: true,
          deposit: true,
          users: {
            select: {
              id: true,
              first_name: true,
              last_name: true,
              image:true,
            }
          }
        }
      }
    }
  });

  const modifiedMessages: IMessages[] = allMessages.map((x: any) => ({
    id: x.id,
    message: x.message,
    createdDate: x.created_date,
    boards: {
      id: x.boards.id, 
      name: x.boards.name,
    },
    userGames: {
      id: x.user_games.id,
      deposit: x.user_games.deposit,
      users: {
        id: x.user_games.users.id,
        firstName: x.user_games.users.first_name,
        lastName: x.user_games.users.last_name,
        image: x.user_games.users.image
      }
    }
  }));

  const filteredMessages = modifiedMessages.filter((message) => message.message !== "deleted");

  return filteredMessages;
};

  
  async function getMessagesByBoardsId(boardsId: number) {
    let messagesByBoardsId;
  
    
      messagesByBoardsId = await prisma.board_message.findMany({
        where: {
          board_id: boardsId,
        },       select: {
          id: true,
          message: true,
          created_date: true,
          boards: {
            select: {
              id: true,
              name: true
            }
          },
          user_games: {
            select: {
              id: true,
              deposit: true,
              users: {
                select: {
                  id: true,
                  first_name: true,
                  last_name: true,
                  image:true,
                }
              }
            }
          }
        }
      });
    
      const modifiedMessages: IMessages[] = messagesByBoardsId.map((x: any) => ({
        id: x.id,
        message: x.message,
        createdDate: x.created_date,
        boards: {
          id: x.boards.id, 
          name: x.boards.name,
        },
        userGames: {
          id: x.user_games.id,
          deposit: x.user_games.deposit,
          users: {
            id: x.user_games.users.id,
            firstName: x.user_games.users.first_name,
            lastName: x.user_games.users.last_name,
            image:x.user_games.users.image
          }
        }
      }));
    
      const filteredMessages = modifiedMessages.filter((message) => message.message !== "deleted");
    
      return filteredMessages;
    };


async function createMessageInBoard(message: any) {
  try {


  const newMesages = await prisma.board_message.create({
    data: {
   message: message.message,
   created_date: message.createdDate,
   board_id: message.boardId,
   user_game_id: message.userGameId,
 
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

  const MessageService = { getAll, getMessagesByBoardsId, createMessageInBoard,deleteMessageById};
  export {MessageService};




