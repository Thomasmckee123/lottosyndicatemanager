import axios from "../integrations/instance";

const signUpUser = async (firstName:string, lastName:string, email:string,password:string, userTypeId: number)=>{
    try{
   const signupData={
            firstName:firstName,
            lastName: lastName,
            email: email,
            password:password,
            balance: 0,
            userTypeId: userTypeId
        }
const response = await axios.post('signup',signupData)
return response.data
    }catch(error){
        console.error("error signing up", error)
    }
} 

export{signUpUser}