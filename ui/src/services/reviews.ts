import axios from "../integrations/instance";


const fetchReviewsBySyndicateId = async(syndicateId: number) =>{
try{
    const response = await axios.get(`reviews/syndicates/${syndicateId}`);
    return response.data;
    
}catch(error){
    console.error("error getting reviews by syndicate id", error);
}
}

export {fetchReviewsBySyndicateId}

