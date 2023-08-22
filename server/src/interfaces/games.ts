
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
   syndicate_id: number;
    }

interface IGameTypes{
    id: number;
      name: string;
    drawDate: Date;
    reward: number;
    image: string;
    ticketCost:number;
}

export{IGames, IGameTypes};