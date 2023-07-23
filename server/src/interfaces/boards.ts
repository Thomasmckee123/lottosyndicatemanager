
//interface for messages
interface IBoardMessage {
  id: number;
  message: string;
  created_date: Date;
  board_id: number;
  user_syndicate_id: number;
}

interface IBoards {
  id: number;
  name: string;
  syndicates: {
    id: number;
    name: string;
  };
  board_message: IBoardMessage[];
}

export { IBoards };