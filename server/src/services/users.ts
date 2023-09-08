import { IUser } from "../interfaces";
import {prisma} from "../utils/prisma"
import bcrypt from "bcrypt"

const getAll = async () => {
  let allUsers = await prisma.users.findMany({
    select: {
      id: true,
      first_name: true,
      last_name: true,
      password: true,
      email: true,
      image: true,
      balance: true,
      user_types: {
        select:{
        id: true,
        name: true
      }
      }
    },
  });
  if(!allUsers){
    return null
  }
  let getAllUsers: any[] = allUsers
    .filter((user) => user.first_name !== "DELETEDUSER")
    .map((x) => ({
      id: x.id,
      firstName: x.first_name,
      lastName: x.last_name,
      password: x.password,
      email: x.email,
      image: x.image,
      balance: Number(x.balance),
      userTypes:{
       id: x.user_types.id,
       name: x.user_types.name
      }
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
        password: true,
        email: true,
        image: true,
        balance:true,
        user_types: {
          select:{
          id: true,
          name: true
        }
        }
      },
    });
    if (!usersById) {
      return null;
  }
    const returnedValue = {
     id: Number(usersById?.id),
    firstName: usersById?.first_name,
    lastName: usersById?.last_name,
    password: usersById?.password,
    email: usersById?.email,
    image: usersById?.image,
    balance: Number(usersById?.balance),
    userTypes: {
      id: usersById.user_types.id,
      name: usersById.user_types.name,
    }
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
        image: "no image selected",
        balance: 0,
        user_type_id: user.userTypeId
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
        user_types: {select:{
          id: true,
          name: true,
        }
        }
      },
      
    });
    if(users.length === 0){
      return null
    }
    const returnedValue = {
      id: Number(users[0]?.id),
     firstName: users[0]?.first_name,
     lastName: users[0]?.last_name,
     password: users[0]?.password,
     email: users[0]?.email,
     image: users[0]?.image,
     balance: Number(users[0]?.balance),
     userTypes:{
      id: users[0]?.user_types.id,
      name: users[0]?.user_types.name,
     }
     };
    
 
   
     return returnedValue;
   };
 


  async function depositMoney(userId:number, balance:number){
    let updateBalance;
    console.log("Servic balance"+ balance)

      updateBalance = await prisma.users.update({
        where: {
          id: userId,
        },
        data: {
         balance: balance
        },
      });
 return updateBalance    
   
  }



  async function takePhoto(photo:any, userId:number){
    let updateImage;
    console.log("IMAGE SERVERR"+ photo)
    console.log("USERID SERVERR"+ userId)
      updateImage = await prisma.users.update({
        where: {
          id: userId,
        },
        data: {
         image: photo
        },
      });
  
    return updateImage
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
  

  const UserService = {takePhoto, depositMoney, getByEmail, deleteUserById,getAll,getUserById, createUser, updateUserDetails};
  export {UserService};

  