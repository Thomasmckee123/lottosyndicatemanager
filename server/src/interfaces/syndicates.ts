// interface for syndicate
interface ISyndicate {
    id: number;
    createdDate: Date;
    name: string;
    description: string | null;
    avatar: string | null;
    ownerId: number;
    users: {
      id: number;
      firstName: string;
      lastName: string;
    };
  }

  

export{ISyndicate}