import {prisma} from "../utils/prisma"
const getAll = async () => {
    return await prisma.syndicates.findMany({
      select: {
        id: true,
        created_date: true,
        name: true,
        description: true,
        avatar: true,
        owner_id: true,
        users: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
          },
        },
      },
    });
};
  const SyndicateService = {getAll};
  export {SyndicateService};