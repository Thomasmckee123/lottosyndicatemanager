
//interface for messages
interface IGames {
  id: number;
    maximumPlayers: number;
    treasury:number;
  
      gameTypes:{
        id: number;
        name: string;
        drawDate: Date;
        reward: number;
        image: string;
        ticketCost: number;
      },
    userSyndicates: {
      startDate: Date;
      users: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        balance:number;
      };
      syndicates: {
        id: number;
        createdDate: Date;
        name: string;
        description: string|null;
        avatar: string|null;
      };
    }}

interface IGameTypes{
      name: string;
    drawDate: Date;
    reward: number;
    image: string;
    ticketCost:number;
}

export{IGames, IGameTypes};