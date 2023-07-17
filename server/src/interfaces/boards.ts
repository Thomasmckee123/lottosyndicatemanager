
//interface for messages
interface IBoards {
        id: true,
        name: string,
        syndicates: {
         
            id: number,
            name: string,
          },
        board_message: {
         
            id: number,
            message: string,
            created_date: Date,
            board_id: number,
            user_syndicate_id: number,
          }
        
        }

export{IBoards};