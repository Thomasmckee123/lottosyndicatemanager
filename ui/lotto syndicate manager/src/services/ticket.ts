
import axios from "../integrations/instance";


const getTicketsByGameId =async(gameId: number)=>{
    try{
let response = await axios(`tickets/games/${gameId}`)
response.data
    }catch(error){
        console.error("error getting the tickets",error)
        
    }
}


export{getTicketsByGameId}