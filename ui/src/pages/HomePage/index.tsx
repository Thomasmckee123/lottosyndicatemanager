import SyndicateContainer from "./components/SyndicateContainer";
import Title from "./components/title";
import TokenUtils from "../../integrations/token";
import { useEffect, useState } from "react";
import fetchUserDetails from "../../services/users";
import { Box } from "@mui/material";

const HomePage = () => {
  const [data, setData] = useState<any>();
  const [userData, setUserdata] = useState<any>();
  useEffect(() => {
    const jwt = TokenUtils.getJWT();
    setData(jwt);
  }, []);
  let userId = data?.claims?.userId;
  useEffect(() => {
    if (userId) {
      fetchUserDetails(userId)
        .then((response) => {
          setUserdata(response);
        })
        .catch((err) => console.log(err));
    }
  }, [userId]);
  const role = Number(userData?.data?.userTypes?.id);

  return (
    <>
      <Box sx={{ margin: "5%" }}>
        {role === 2 ? <Title /> : <SyndicateContainer role={role} />}
      </Box>
    </>
  );
};
export default HomePage;
