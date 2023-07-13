import {prisma} from "../utils/prisma"
const getAll = async () => {

    return await prisma.games.findMany({
      select:{
        name: true,
        draw_date: true,
        reward: true,
        required_ticket_number: true,
        user_syndicates:{
          select:{
            start_date: true,
            users:{
              select:{
                id: true,
                first_name: true,
                last_name: true,
                email: true,  
              }
            },
            syndicates:{
              select:{
                id:true,
                created_date:true,
                name: true,
                description:true,
                avatar: true,
              }
            }
          }
        }
      }
    });
  };
  

  const GameService = {getAll};
  export {GameService};