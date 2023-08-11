
//interface for messages
interface IGames {
  id: number;
    name: string;
    drawDate: Date;
    reward: number;
    image: string;
    requiredTicketNumber: string;
    userSyndicates: {
      startDate: Date;
      users: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
      };
      syndicates: {
        id: number;
        createdDate: Date;
        name: string;
        description: string|null;
        avatar: string|null;
      };
    }
  }

export{IGames};