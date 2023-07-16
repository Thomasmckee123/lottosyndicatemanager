import {prisma} from "../utils/prisma"

const getAll = async () => {
    return await prisma.boards.findMany({
      select: {
        name: true,
        syndicates: {
          select: {
            id: true,
            name: true,
          }
        }, 
        board_message: {
          select: {
            id: true,
            message: true,
            created_date: true,
            board_id: true,
            user_syndicate_id: true,
          },
        },
      },
    });
  };
  //getting boards by syndicate Id
  async function getBoardsBySyndicateId(syndicateId: number) {
    let boardsBySyndicateId;

    try {
      boardsBySyndicateId = await prisma.boards.findMany({
        where: { syndicate_id: syndicateId },
        include: {syndicates: true },
      });
    } catch (error) {

      throw Error("Cannot get client by user id", error);
    }

    return boardsBySyndicateId;
  }
 
//creating a new board
async function createBoards(board: any) {
    try {
  
  
    const newBoards = await prisma.boards.create({
      data: {
     name: board.name,
     syndicate_id: board.syndicate_id,

      },
    });
      return newBoards.name;
    } catch(error) {
      console.log(error);
      throw Error("Cannot create user");
    }
  } 

  async function deleteBoardsById(boardId) {
    try {
      // First, delete all messages that reference the board
      await prisma.board_message.deleteMany({
        where: {
          board_id: boardId
        },
      });
      
      // Then, delete the board
      const deletedBoard = await prisma.boards.delete({
        where: {
          id: boardId
        },
      });
      
      return deletedBoard;
      
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  const BoardsService = {deleteBoardsById, getAll, getBoardsBySyndicateId, createBoards};
  export {BoardsService};