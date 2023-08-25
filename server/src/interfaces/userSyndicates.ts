  //interface for user syndicates

  interface IUserSyndicate {
    id: number
    startDate: Date,
    users: {
      id: number,
      firstName: string,
      lastName: string,
      email: string,
    };
    syndicates: {
        id: number,
      createdDate: Date,
      name: string,
      description: string | null,
      avatar: string | null,
    };
    roles: {
      id: number,
      name: string
    };
  }
  export{IUserSyndicate}