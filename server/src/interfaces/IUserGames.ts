interface IUserGames {
    id: number;
    startDate:Date,
    deposit: number,
    userId:number,
    games:{
        id: number,
        maximumPlayers: number,
        treasury: number,
        gameTypes:{
         id: number, 
        name: string,
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
    }
    export {IUserGames}