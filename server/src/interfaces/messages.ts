
//interface for messages
interface IMessages{
        id: number,
        message: string,
        createdDate: Date,
        boards:{
          
                id: number, 
                name: string

            },
        userSyndicates:{
            id: number,
            users:{
            id: number,
            firstName: string,
            lastName:string,
            },
        },
}

export{IMessages};