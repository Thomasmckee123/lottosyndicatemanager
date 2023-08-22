//interface for tickets
interface ITicket {
    id: number,
    ticketCode: string,
    totalRewardValue: number,
    ticketStatus: {
      id: number,
      name: string,
    },
    games:{ 
      id:number,
    treasury: number,
    gameTypes:{
     
     id: number,
     name: string,
     drawDate: Date,
     reward: number,
     image: string,
     ticketCost: number,
    },
   syndicateId: number,
  
  }}

  

export{ITicket};