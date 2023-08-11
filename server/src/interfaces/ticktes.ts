//interface for tickets
interface ITicket {
    id: number,
    ticketCode: string,
    totalRewardValue: number,
    ticketStatus: {
      id: number,
      name: string,
    },
    userSyndicates: {
      id: number,
      users: {
        id: number,
        firstName: string,
        lastName: string,
      },
    },
    gameId: number,
  }
  

export{ITicket};