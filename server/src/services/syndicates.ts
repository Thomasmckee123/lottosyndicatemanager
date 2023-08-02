import { ISyndicate } from "../interfaces/index";
import { IUserSyndicate } from "../interfaces/syndicates";
import {prisma} from "../utils/prisma"
import bcrypt from "bcrypt"

const getAll = async () => {
   const allSyndicates : ISyndicate[]=  await prisma.syndicates.findMany({
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
    const filteredUsers = allSyndicates?.filter((syndicate) => syndicate.name !== "DELETED")
    return filteredUsers;
};
const getSyndicateById = async (syndicateId: number) => {
   
  
  const syndicatesById  = await prisma.syndicates.findUnique({
     where: {
       id: syndicateId,
     }, select:{
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
   
    if (!syndicatesById) {
     return null;
   }

 
   return syndicatesById;
 };
//getting the syndicates by user id
async function getSyndicatesByUserId(userId: number) {
    let syndicatesByUserId : IUserSyndicate[] | null;

    try {
      syndicatesByUserId = await prisma.user_syndicates.findMany({
        where: { user_id: userId },
          select:{
            start_date: true,
            users:{select:{
id: true,
first_name: true,
last_name: true,
email: true

            },
          },syndicates: {
select:{
  id:true,
created_date: true,
name: true,
description: true,
avatar: true,


}, },
roles:{
  select:{
 name: true
  }
}
          }

          }
      
      );
    } catch (error) {

      throw Error("Cannot get syndicateby user id", error);
    }
    const filteredUsers = syndicatesByUserId?.filter((syndicate) => syndicate.users.first_name!== "DELETEDUSER" || syndicate.syndicates.name !== "DELETED")

    return filteredUsers;

  }
  
//creating a new syndicate
async function createSyndicate(syndicate: any) {
  try {

  const newSyndicate = await prisma.syndicates.create({
    data: {
      created_date: new Date(),
      name: syndicate.name,
      description:syndicate.description,
      avatar:syndicate.avatar,
      owner_id: syndicate.owner_id
  
    },
  });
    return newSyndicate.created_date;
  } catch(error) {
    console.log(error);
    throw Error("Cannot create syndicate");
  }
} 
//update syndicate details
async function updateSyndicateDetails(syndicate: any) {
  let updateSyndicate;
  try {
    updateSyndicate= await prisma.syndicates.update({
      where: {
        id: syndicate.id,
      },
      data: {
      name: syndicate.name,
      description: syndicate.description,
      avatar:syndicate.avatar
      },
    });
  } catch (error) {
    console.log(error);
  }
  return updateSyndicate;
}

//deleting syndicate details
  async function deleteSyndicateById(syndicateId: number) {
    let deletedSyndicate;
    try {
      deletedSyndicate= await prisma.syndicates.update({
        where: {
          id: syndicateId,
        },
        data: {
          created_date: new Date(),
          name:"DELETED",
          description: "DELETEDUSERPASS",
          avatar: "DELETED",
        },
      });
    } catch (error) {
      console.log(error);
    }
    return deletedSyndicate;
  }
  const SyndicateService = {getSyndicateById, deleteSyndicateById, getAll, getSyndicatesByUserId,createSyndicate,updateSyndicateDetails};
  export {SyndicateService};