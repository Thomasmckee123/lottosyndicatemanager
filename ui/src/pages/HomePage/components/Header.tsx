import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

function Header() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "10vh",
        borderRadius: "20px",
        boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
        padding: "10px",
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          maxWidth: "80vw",
        }}
      >
        <AppBar
          position="static"
          sx={{ backgroundColor: "darkred", borderRadius: "20px" }}
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            ></IconButton>
            <Typography variant="h6" gutterBottom sx={{ flexGrow: 1 }}>
              Your Syndicates
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </Box>
  );
}

export default Header;
