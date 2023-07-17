// interface for syndicate
interface ISyndicate {
    id: number;
    created_date: Date;
    name: string;
    description: string | null;
    avatar: string | null;
    owner_id: number;
    users: {
      id: number;
      first_name: string;
      last_name: string;
    };
  }
  //interface for user syndicates

  interface IUserSyndicate {
    start_date: Date,
    users: {
      id: number,
      first_name: string,
      last_name: string,
      email: string,
    };
    syndicates: {
      created_date: Date,
      name: string,
      description: string | null,
      avatar: string | null,
    };
    roles: {
      name: string
    };
  }
  
  

export{ISyndicate, IUserSyndicate}