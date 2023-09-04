import axios from "../integrations/instance";

const fetchUserDetails = async (userId: string) => {
  const userDetails = await axios.get(`users/${userId}`);
  return userDetails;
};

export default fetchUserDetails;
