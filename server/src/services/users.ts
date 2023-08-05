import { IUser } from "../interfaces";
import {prisma} from "../utils/prisma"
import bcrypt from "bcrypt"

const getAll = async () => {
  let allUsers = await prisma.users.findMany({
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
    },
  });
  let getAllUsers: IUser[] = allUsers
    .filter((user) => user.first_name !== "DELETEDUSER")
    .map((x) => ({
      userId: x.id,
      firstName: x.first_name,
      lastName: x.last_name,
      email: x.email,
    }));
  return getAllUsers;
};
  
  const getUserById = async (userId: number) => {
   
  
   const usersById  = await prisma.users.findUnique({
      where: {
        id: userId,
      }, select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
      },
    });
    
     if (!usersById) {
      return null;
    }

  
    return usersById;
  };
  const getUserSyndicateById = async (syndicateId: number) => {
   
  
    const usersSyndicatesById : any = await prisma.user_syndicates.findMany({
       where: {
         id: syndicateId,
       }, 
       select: {
         id: true,
         start_date: true,
         users:{select:{
          id: true,
          first_name: true,
          last_name: true,
          email: true
          } 
        },
         syndicates:
         {select:{
          id: true
         }

         },
         roles:{
          select:{
          name: true
         }

         }
       },
     });
     
      if (!usersSyndicatesById) {
       return null;
     }
 
   
     return usersSyndicatesById;
   };
 
  
//creating a new user
  async function createUser(user: any) {
    try {
    const salt = await bcrypt.genSalt();
  
    const hashedPassword = await bcrypt.hash(user.password, salt);
  
    const newUser = await prisma.users.create({
      data: {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        password: hashedPassword
      },
    });
      return newUser.email;
    } catch(error) {
      console.log(error);
      throw Error("Cannot create user");
    }
  } 

  
//creating a userSyndicate

async function createUserSyndicate(userSyndicate: any) {
  try {
  const salt = await bcrypt.genSalt();


  const newUserSyndicate = await prisma.user_syndicates.create({
    data: {
     start_date: userSyndicate.start_date,
     role_id: userSyndicate.role_id,
    },
  });
    return newUserSyndicate.start_date;
  } catch(error) {
    console.log(error);
    throw Error("Cannot create user");
  }
} 

//update user details
  async function updateUserDetails(user: any) {
    let updateUser;
    try {
      updateUser = await prisma.users.update({
        where: {
          id: user.id,
        },
        data: {
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
        },
      });
    } catch (error) {
      console.log(error);
    }
    return updateUser;
  }

  const getByEmail = async (email: string) => {
    const users = await prisma.users.findMany({
      where: {
        AND: [
          {
            email: email,
          },
          {
            first_name: { not: "DELETEDUSER" },
          },
        ],
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        password: true,
      },
    });
    return users && users.length>0 && users[0];
  };
  async function deleteUserById(userId: number) {
    let deletedUser;
    try {
      deletedUser = await prisma.users.update({
        where: {
          id: userId,
        },
        data: {
          first_name: "DELETEDUSER",
          last_name:"DELETED",
          password: "DELETEDUSERPASS",
          email: "DELETED",
        },
      });
    } catch (error) {
      console.log(error);
    }
    return deletedUser;
  }
  

  const UserService = {getUserSyndicateById, getByEmail, deleteUserById,getAll,getUserById, createUser, updateUserDetails,createUserSyndicate};
  export {UserService};

  