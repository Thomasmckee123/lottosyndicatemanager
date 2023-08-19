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
      image: true,
      balance: true,
    },
  });
  let getAllUsers: IUser[] = allUsers
    .filter((user) => user.first_name !== "DELETEDUSER")
    .map((x) => ({
      id: x.id,
      firstName: x.first_name,
      lastName: x.last_name,
      email: x.email,
      image: x.image,
      balance: Number(x.balance)
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
        image: true,
        balance:true,
      },
    });
    const returnedValue: IUser = {
     id: Number(usersById?.id),
    firstName: usersById?.first_name ?? "",
    lastName: usersById?.last_name??"",
    email: usersById?.email??"",
    image: usersById?.image??"",
    balance: Number(usersById?.balance),
    };
    if(!returnedValue){
      return null;
    }

  
    return returnedValue;
  };

  
  
//creating a new user
  async function createUser(user: any) {
    try {
    const salt = await bcrypt.genSalt();
  
    const hashedPassword = await bcrypt.hash(user.password, salt);
  
    const newUser = await prisma.users.create({
      data: {
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        password: hashedPassword,
        image: user.image,
        balance: 0
      },
    });
      return newUser.email;
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
          first_name: user.firstName,
          last_name: user.lastName,
          image:user.image,
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
        image: true,
        password: true,
        balance: true,
      },
      
    });
    let getAllUsers: IUser[] = users
    .filter((user) => user.first_name !== "DELETEDUSER")
    .map((x) => ({
      id: x.id,
      firstName: x.first_name,
      lastName: x.last_name,
      email: x.email,
      image: x.image,
      balance: Number(x.balance)
    }));  
    return getAllUsers && getAllUsers.length>0 && users[0];
  };

  async function depositMoney(user:any){
    let updateBalance;
    try{
      updateBalance = await prisma.users.update({
        where: {
          id: user.id,
        },
        data: {
         balance: user.balance
        },
      });
    }catch(err){
      console.error("cannot update balance")
    }
    return updateBalance
  }
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
  

  const UserService = {depositMoney, getByEmail, deleteUserById,getAll,getUserById, createUser, updateUserDetails};
  export {UserService};

  