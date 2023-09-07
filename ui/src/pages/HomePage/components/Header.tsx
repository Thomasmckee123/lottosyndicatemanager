import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { StyledPaper } from "../styles/styled";
import TokenUtils from "../../../integrations/token";
import { useEffect, useState } from "react";
import fetchUserDetails from "../../../services/users";

function Header() {
  const [data, setData] = useState<any>();
  const [userData, setUserdata] = useState<any>();
  useEffect(() => {
    const jwt = TokenUtils.getJWT();
    setData(jwt);
  }, []);
  let userId = data?.claims?.userId;
  useEffect(() => {
    console.log("userId", userId);
    if (userId) {
      fetchUserDetails(userId)
        .then((response) => {
          console.log(response);
          setUserdata(response);
        })
        .catch((err) => console.log(err));
    }
  }, [userId]);
  return (
    <StyledPaper
      sx={{
        backgroundColor: "darkred",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
        marginBottom: "2%",
      }}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        ></IconButton>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ flexGrow: 1, fontSize: "200%" }}
        >
          Welcome {userData ? `${userData?.data?.firstName} ` : "..."}
        </Typography>
      </Toolbar>
    </StyledPaper>
  );
}

export default Header;
