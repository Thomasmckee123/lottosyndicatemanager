import { ISyndicate } from "../interfaces/index";
import {prisma} from "../utils/prisma"
import bcrypt from "bcrypt"

const getAll = async () => {
   const allSyndicates =  await prisma.syndicates.findMany({
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
    const modifiedSyndicate: ISyndicate[] = allSyndicates.map(
      (x: {
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
      }) => ({
        id: x.id,
        createdDate: x.created_date,
        name: x.name,
        description: x.description,
        avatar: x.avatar,
        ownerId: x.owner_id,
        users: {
          id: x.users.id,
          firstName: x.users.first_name,
          lastName: x.users.last_name,
}})
    );
  
    const filteredSyndicates = modifiedSyndicate?.filter((syndicate) => syndicate.name !== "DELETED")
    return filteredSyndicates;

};

const getSyndicateByName = async(name :string)=>{
  
  const syndicatesByName = await prisma.syndicates.findMany({
  where: {
    name: {
      contains: name
    }
  },
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
  const modifiedSyndicate: ISyndicate[] = syndicatesByName.map(
    (x: {
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
    }) => ({
      id: x.id,
      createdDate: x.created_date,
      name: x.name,
      description: x.description,
      avatar: x.avatar,
      ownerId: x.owner_id,
      users: {
        id: x.users.id,
        firstName: x.users.first_name,
        lastName: x.users.last_name,
}})
  );

  const filteredSyndicates = modifiedSyndicate?.filter((syndicate) => syndicate.name !== "DELETED")
  return filteredSyndicates;

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

   const returnedValue: ISyndicate = {
    id: Number(syndicatesById?.id),
   createdDate: syndicatesById?.created_date ?? "",
   name: syndicatesById?.name??"",
   description: syndicatesById?.description??"",
   avatar:syndicatesById?.avatar??"",
   ownerId: syndicatesById?.owner_id,
   users:{
    id: Number(syndicatesById?.users.id),
    firstName: syndicatesById?.users.first_name??"",
    lastName: syndicatesById?.users.last_name??""
   }
   };
   return returnedValue;
 };

//creating a new syndicate
async function createSyndicate(syndicate: any) {
  try {
  const newSyndicate = await prisma.syndicates.create({
    data: {
      created_date: new Date(),
      name: syndicate.name,
      description:syndicate.description,
      avatar:syndicate.avatar,
      owner_id: syndicate.ownerId
  
    },
  });
    return newSyndicate.id;
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
  const SyndicateService = {getSyndicateByName,getSyndicateById, deleteSyndicateById, getAll, createSyndicate,updateSyndicateDetails};
  export {SyndicateService};