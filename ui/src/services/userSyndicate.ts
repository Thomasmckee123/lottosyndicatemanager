import axios from "../integrations/instance";

const fetchUserSyndicateByUserSyndicateId = async (userSyndicateId: number) => {
    const response = await axios.get(`userSyndicates/userSyndicatesById/${userSyndicateId}`);
    return response;
  };
  export {fetchUserSyndicateByUserSyndicateId};