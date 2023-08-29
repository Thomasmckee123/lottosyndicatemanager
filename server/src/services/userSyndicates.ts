import { IUserSyndicate } from "../interfaces";
import {prisma} from "../utils/prisma"

const getUserSyndicateByUserSyndicteId = async (userSyndicateId: number)=> {
    const userSyndicateByUserSyndicteId = await prisma.user_syndicates.findUnique({
      where: {
        id : userSyndicateId
      }  ,     select: {
        id: true,
        start_date: true,
   user_id: true,
        syndicates:
        {select:{
         id: true,
         created_date:true,
         name:true,
         description:true,
         avatar:true,
        }

        },
       role_id: true,

        }
      },
    );   
    
    const returnedValue = {
        id: Number(userSyndicateByUserSyndicteId?.id),
       startDate: new Date(),
       userId: Number(userSyndicateByUserSyndicteId?.user_id),
       syndicates:{
        id: Number(userSyndicateByUserSyndicteId?.syndicates.id),
        createdDate: userSyndicateByUserSyndicteId?.syndicates.created_date,
        name: userSyndicateByUserSyndicteId?.syndicates.name,
        description: userSyndicateByUserSyndicteId?.syndicates.description,
        avatar: userSyndicateByUserSyndicteId?.syndicates.avatar
       },
       roleId: Number(userSyndicateByUserSyndicteId?.role_id)

       };
    if(!returnedValue){
      return null;
    }
    return returnedValue
  }
   
  
  const getUserSyndicateBySyndicateId = async (syndicateId: number) => {

    const usersSyndicatesById = await prisma.user_syndicates.findMany({
       where: {
         syndicate_id: syndicateId,
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
          id: true,
          created_date:true,
          name:true,
          description:true,
          avatar:true,
         }

         },
         roles:{
          select:{
            id: true,
          name: true
         }

         }
       },
     });   

     const users: IUserSyndicate[] = usersSyndicatesById.map(
        (x: {    
          id: number;
          start_date: Date;
          users: {
            id: number;
            first_name: string;
            last_name: string;
            email: string;
          };
          syndicates: {
            id: number;
            created_date: Date;
            name: string;
            description: string;
            avatar: string;
          };
          roles: {
            id: number;
            name: string;
          };
        }) => ({
          id: x.id,
          startDate: x.start_date,
          users: {
            id: x.users.id,
            firstName: x.users.first_name,
            lastName: x.users.last_name,
            email: x.users.email
          },
          syndicates: {
            id: x.syndicates.id,
            createdDate: x.syndicates.created_date,
            name: x.syndicates.name,
            description: x.syndicates.description,
            avatar: x.syndicates.avatar
          },
          roles: {
            id: x.roles.id,
            name: x.roles.name
          }
        })
      );
      
      
    
      if (!users) {
       return null;
     }
     
   
     return users;
   };

 //creating a userSyndicate

async function createUserSyndicate(userSyndicate: any) {
    try {
    
  
  
    const newUserSyndicate = await prisma.user_syndicates.create({
      data: {
       start_date: userSyndicate.startDate,
       user_id: userSyndicate.userId,
       syndicate_id: userSyndicate.syndicateId,
       role_id: userSyndicate.roleId
      },
    });
      return newUserSyndicate.start_date;
    } catch(error) {
      console.log(error);
      throw Error("Cannot create user");
    }
  } 

  //getting the syndicates by user id
async function getSyndicatesByUserId(userId: number) {
    let syndicatesByUserId 

    try {
      syndicatesByUserId = await prisma.user_syndicates.findMany({
        where: { user_id: userId, 
     },

          select:{
            id: true,
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
owner_id: true


}, },
roles:{
  select:{
    id:true,
 name: true
  }
}
          }

          }
      
      );
    } catch (error) {

      throw Error("Cannot get syndicateby user id", error);
    }
    const users: IUserSyndicate[] = syndicatesByUserId.map(
        (x: {    
          id: number;
          start_date: Date;
          users: {
            id: number;
            first_name: string;
            last_name: string;
            email: string;
          };
          syndicates: {
            id: number;
            created_date: Date;
            name: string;
            description: string;
            avatar: string;
          };
          roles: {
            id: number;
            name: string;
          };
        }) => ({
          id: x.id,
          startDate: x.start_date,
          users: {
            id: x.users.id,
            firstName: x.users.first_name,
            lastName: x.users.last_name,
            email: x.users.email
          },
          syndicates: {
            id: x.syndicates.id,
            createdDate: x.syndicates.created_date,
            name: x.syndicates.name,
            description: x.syndicates.description,
            avatar: x.syndicates.avatar
          },
          roles: {
            id: x.roles.id,
            name: x.roles.name
          }
        })
      );
      
      
    
      if (!users) {
       return null;
     }
     
   
 
    const filteredUsers = users?.filter((syndicate) => syndicate.users.firstName!== "DELETEDUSER" || syndicate.syndicates.name !== "DELETED")

    return filteredUsers;

  }
  //creating a userSyndicate
  async function updateUserSyndicateDetails(userSyndicate: any) {
    let updateUserSyndicates;
    try {
      updateUserSyndicates = await prisma.user_syndicates.update({
        where: {
          id: userSyndicate.id,
        },
       data: {
       role_id: userSyndicate.roleId
      }, 
      });
    } catch (error) {
      console.log(error);
    }
    return updateUserSyndicates;
  }



  /**
 * Delete a user syndicate with the specified ID.
 * 
 * @param userSyndicateId The ID of the user syndicate to delete.
 * @return An object containing the details of the deleted user syndicate.
 * 
 * @throws Error If the user syndicate cannot be deleted.
 * 
 * @swagger
 * /user-syndicates/{userSyndicateId}:
 *   delete:
 *     summary: Delete a user syndicate
 *     description: Delete the user syndicate with the specified ID.
 *     parameters:
 *       - in: path
 *         name: userSyndicateId
 *         required: true
 *         description: The ID of the user syndicate to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The ID of the deleted user syndicate.
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message
 */
  async function deleteUserSyndicateById(userSyndicateId: number) {
    try {
  
      const deletedUserSyndicate = await prisma.user_syndicates.delete({
        where: {
          id: userSyndicateId
        },
      });
      
      return deletedUserSyndicate;
      
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async function deleteUserSyndicateBySyndicateId(syndicateId) {
    try {
  
      const deletedUserSyndicate = await prisma.user_syndicates.deleteMany({
        where: {
          syndicate_id: syndicateId
        },
      });
      
      return deletedUserSyndicate;
      
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
    
  
  
 const UserSyndicateService= {deleteUserSyndicateBySyndicateId, deleteUserSyndicateById, updateUserSyndicateDetails, createUserSyndicate, getSyndicatesByUserId,getUserSyndicateByUserSyndicteId, getUserSyndicateBySyndicateId }
 export{UserSyndicateService};