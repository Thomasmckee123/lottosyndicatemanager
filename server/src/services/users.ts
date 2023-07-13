import {prisma} from "../utils/prisma"
const getAll = async () => {
    return await prisma.users.findMany({
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
      },
    });
  };
  const UserService = {getAll};
  export {UserService};