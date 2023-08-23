interface IGameMember {
  id: number;
  maximumPlayers: number;
  treasury: number;
  gameTypes: {
    id: number;
    name: string;
  };
  syndicates_id: number;
  userGames?: any[];
}

interface IMember {
  id: number;
  startDate: string;
  deposit: number;
  roleId: number;
  userId: number;
  games: IGameMember;
}

interface IGameType {
  id: number;
  name: string;
  drawDate: string;
  reward: number;
  image: string;
  ticketCost: number;
}

interface IGame {
  id: number;
  maximumPlayers: number;
  treasury: number;
  gameTypes: IGameType;
  syndicateId: number;
}

interface IDecodedJWT {
  sub: number;
  claims: {
    userId: number;
    email: string;
    firstName: string;
    balance: number;
  };
  iat: number;
  exp: number;
}

interface IMemberPerGame {
  [key: number]: IMember[];
}

interface ICustomTab {
  children: React.ReactElement;
  value: number;
  index: number;
}

export type {
  IDecodedJWT,
  IGame,
  IMember,
  IMemberPerGame,
  IGameMember,
  IGameType,
  ICustomTab,
};
