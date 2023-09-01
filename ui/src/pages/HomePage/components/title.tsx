import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { NavigationRoutes } from "../../../constants";
import TokenUtils from "../../../integrations/token";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import fetchUserDetails from "../../../services/users";
import { CustomBox } from "../styles/styled";

function Title() {
  const [data, setData] = useState<any>();
  const [userData, setUserdata] = useState<any>();
  useEffect(() => {
    const jwt = TokenUtils.getJWT();
    setData(jwt);
  }, []);
  let userId = data?.claims?.userId;
  useEffect(() => {
    console.log("userId", userId);
    fetchUserDetails(userId).then((response) => {
      console.log(response);
      setUserdata(response);
    });
  }, [userId]);
  console.log("user Data", userData);
  console.log("data", userData?.data?.firstName);
  console.log(data);
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      <CustomBox>
        <Typography variant="h4" gutterBottom sx={{ size: "100%" }}>
          Welcome {userData ? `${userData?.data?.firstName}` : "..."}
        </Typography>
        <Box>
          <Link
            to={NavigationRoutes.CREATESYNDICATE.replace(
              ":ownerId",
              `${data?.claims?.userId}`
            )}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{ backgroundColor: "darkred" }}
              startIcon={<AddIcon />}
            >
              Create a new syndicate
            </Button>
          </Link>
        </Box>
      </CustomBox>
    </Box>
  );
}

export default Title;
