import { Box, Grid } from "@mui/material";
import Games from "./differentGames";

function JoinGame() {
  return (
    <Box
      sx={{
        width: "70vw",
        height: "70vh",
        backgroundColor: "darkgray",
        overflow: "auto", // add overflow
        position: "absolute", // centering
        top: "50%", // centering
        left: "50%", // centering
        transform: "translate(-50%, -50%)", // centering
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={6} md={4}>
          <Games />
        </Grid>
        <Grid item xs={6} md={4}>
          <Games />
        </Grid>
        <Grid item xs={6} md={4}>
          <Games />
        </Grid>
        <Grid item xs={6} md={4}>
          <Games />
        </Grid>
      </Grid>
    </Box>
  );
}

export default JoinGame;
