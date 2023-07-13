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
async function getSyndicatesByUserId(userId: number) {
    let syndicatesByUserId;

    try {
      syndicatesByUserId = await prisma.user_syndicates.findMany({
        where: { user_id: userId },
        include: { users: true, syndicates: true },
      });
    } catch (error) {

      throw Error("Cannot get client by user id", error);
    }

    return syndicatesByUserId;
  }

  const SyndicateService = {getAll, getSyndicatesByUserId};
  export {SyndicateService};