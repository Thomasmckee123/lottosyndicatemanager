import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { StyledPaper } from "../styles/styled";

function Header() {
  return (
    <StyledPaper
      sx={{
        backgroundColor: "darkred",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
          Your Syndicates
        </Typography>
      </Toolbar>
    </StyledPaper>
  );
}

export default Header;
