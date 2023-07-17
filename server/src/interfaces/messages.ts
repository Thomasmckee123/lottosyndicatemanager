
//interface for messages
interface IMessages{
        id: number,
        message: string,
        created_date: Date,
        boards:{
          
                id: number, 
                name: string

            },
        user_syndicates:{
            id: number,
            users:{
            id: number,
            first_name: string,
            last_name:string,
            },
        },
}

export{IMessages};