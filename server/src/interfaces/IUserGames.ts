interface IUserGames {
    id: number;
    startDate:Date,
    deposit: number,
    roleId: number,
    userId:number,
    games:{
        id: number,
        maximumPlayers: number,
        treasury: number,
        gameTypes:{
         id: number, 
        name: string,
        },
    syndicate_id: number,
        }
    }
    export {IUserGames}