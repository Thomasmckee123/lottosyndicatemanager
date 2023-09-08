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
    if (userId) {
      fetchUserDetails(userId)
        .then((response) => {
          setUserdata(response);
        })
        .catch((err) => console.log(err));
    }
  }, [userId]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="80vh"
      width="100%"
    >
      <CustomBox sx={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)" }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontSize: "100%",
          }}
        >
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
              sx={{
                backgroundColor: "darkred",
                height: "20vh",
                width: "20vw",
                fontSize: "1rem",
              }}
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
