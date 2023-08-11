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
  const modifiedMessages: IMessages[] = allMessages.map(
    (x: {       
       id: number;
      message: string;
      created_date: Date;
      boards:{
              id: number; 
              name: string;
          },
      user_syndicates:{
          id: number;
          users:{
          id: number;
          first_name: string;
          last_name:string;
          },
      },
    }) => ({
      id: x.id,
      message: x.message,
      createdDate:x.created_date,
      boards:{
        
              id: x.boards.id, 
              name: x.boards.name,

          },
      userSyndicates:{
          id: x.user_syndicates.id,
          users:{
          id: x.user_syndicates.users.id,
          firstName: x.user_syndicates.users.first_name,
          lastName:x.user_syndicates.users.last_name,
          }}}))


  const filteredMessages = modifiedMessages?.filter((message) => message.message !== "deleted");

  return filteredMessages;
};


  
  async function getMessagesByBoardsId(boardsId: number) {
    let messagesByBoardsId;
  
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
    }const modifiedMessages: IMessages[] = messagesByBoardsId.map(
    (x: {       
       id: number;
      message: string;
      created_date: Date;
      boards:{
              id: number; 
              name: string;
          },
      user_syndicates:{
          id: number;
          users:{
          id: number;
          first_name: string;
          last_name:string;
          },
      },
    }) => ({
      id: x.id,
      message: x.message,
      createdDate:x.created_date,
      boards:{
        
              id: x.boards.id, 
              name: x.boards.name,

          },
      userSyndicates:{
          id: x.user_syndicates.id,
          users:{
          id: x.user_syndicates.users.id,
          firstName: x.user_syndicates.users.first_name,
          lastName:x.user_syndicates.users.last_name,
          }}}))
    const filteredMessages = modifiedMessages?.filter((message) => message.message !== "DELETED");

    return filteredMessages;
  }
  //creating a new message in a board



async function createMessageInBoard(message: any) {
  try {


  const newMesages = await prisma.board_message.create({
    data: {
   message: message.message,
   created_date: message.createdDate,
   board_id: message.boardId,
   user_syndicate_id: message.userSyndicateId,
 
    },
  });
    return newMesages.created_date;
  } catch(error) {
    console.log(error);
    throw Error("Cannot create message");
  }
} 
async function getGameMessage(gameId: number){
  try{
const game = await prisma.games.findUnique({
      where: { id: gameId },
    });  
    return game;
  }catch(error){
    console.log(error)
    throw Error("cannot get game");
  }
  }
  async function createGameMessage(message: any, gameId: number) {
    try {
        // Get game data from the game ID
        const game = await getGameMessage(gameId); 
        const gameMessage = JSON.stringify(game);
        console.log(gameMessage);
        // Create the new message
        const newGameMessage = await prisma.board_message.create({
            data: {
              message: message.message,
              created_date: message.createdDate,
                board_id: message.boardId,
                user_syndicate_id: message.userSyndicateId,
            },
        });

        return newGameMessage;
    } catch(error) {
        console.log(error);
        throw Error("Cannot post game");
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

  const MessageService = {getGameMessage, createGameMessage, getAll, getMessagesByBoardsId, createMessageInBoard,deleteMessageById};
  export {MessageService};




