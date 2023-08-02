
//interface for messages
interface IGames {
    name: string;
    draw_date: Date;
    reward: number;
    image: string;
    required_ticket_number: string;
    user_syndicates: {
      start_date: Date;
      users: {
        id: number;
        first_name: string;
        last_name: string;
        email: string;
      };
      syndicates: {
        id: number;
        created_date: Date;
        name: string;
        description: string|null;
        avatar: string|null;
      };
    }
  }

export{IGames};