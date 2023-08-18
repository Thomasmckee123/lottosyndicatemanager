
//interface for messages
interface IMessages{
        id: number,
        message: string,
        createdDate: Date,
        boards:{
          
                id: number, 
                name: string

            },
            userGames: {
               
            id:number
                  deposit: number,
                  users:{
                       
                      id: number,
                      firstName: string,
                      lastName: string
                    
                  }
                }}


export{IMessages};