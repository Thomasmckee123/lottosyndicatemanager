import { IBoards } from "../interfaces";
import {prisma} from "../utils/prisma"

const getAll = async () => {
    const getAllBoards=  await prisma.boards.findMany({
      select: {
        id: true,
        name: true,
        games: {
          select: {
            id: true,
          user_games:{
            select:{
              id:true,
              deposit:true,
              users: {select:{
                id: true,
                first_name: true,
                last_name:true
              }}
            }
          }
          }
        }, 
        board_message: {
          select: {
            id: true,
            message: true,
            created_date: true,
            board_id: true,
            user_game_id: true,
          },
        },
      },
    });
      
    return getAllBoards
  };
  //getting boards by syndicate Id
  async function getBoardsByGameId(gameId: number) {
    let boardsBySyndicateId;

    try {
      boardsBySyndicateId = await prisma.boards.findMany({
        where: { game_id: gameId },
        select: {
          id: true,
          name: true,
          games: {
            select: {
              id: true,
              user_games:{
                select:{
                  id:true,
                  deposit:true,
                  users: {select:{
                    id: true,
                    first_name: true,
                    last_name:true
                   } }}
                }
            }
          }, 
          board_message: {
            select: {
              id: true,
              message: true,
              created_date: true,
              board_id: true,
              user_games:{
                select:{
                users:{
                  select:{
                  first_name:true,
                  last_name: true
                }
              }
              }
              }
            },
          },
        },
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
     game_id: board.gameId,

      },
    });
      return newBoards.name;
    } catch(error) {
      console.log(error);
      throw Error("Cannot create user");
    }
  } 
//update boards

async function updateBoards(board: any) {
  let updateBoards;
  try {
    updateBoards= await prisma.boards.update({
      where: {
        id: board.id,
      },
      data: {
      name: board.name,
      },
    });
  } catch (error) {
    console.log(error);
  }
  return updateBoards;
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
  
  const BoardsService = {deleteBoardsById, getAll, getBoardsByGameId, createBoards, updateBoards};
  export {BoardsService};