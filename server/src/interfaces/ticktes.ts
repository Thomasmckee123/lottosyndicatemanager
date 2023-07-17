//interface for tickets
interface ITicket {
    id: number,
    ticket_code: string,
    total_reward_value: number,
    ticket_status: {
      id: number,
      name: string,
    },
    user_syndicates: {
      id: number,
      users: {
        id: number,
        first_name: string,
        last_name: string,
      },
    },
    game_id: number,
  }
  

export{ITicket};