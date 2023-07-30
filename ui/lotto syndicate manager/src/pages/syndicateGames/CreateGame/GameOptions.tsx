import { Box, Grid, Typography } from "@mui/material";
import ProposeGameOptions from "./ProposeGames";
import CreatePersonalisedGame from "./createPersonalisedGame";

function GameOptions() {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center", // Center children horizontally
        }}
      >
        <Box
          sx={{
            width: "70vw",
            height: "10vh",
            backgroundColor: "darkred",
            borderRadius: "10%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: 5,
          }}
        >
          <Typography variant="h3">Pick an option</Typography>
        </Box>
        <Box
          sx={{
            width: "70vw",
            height: "70vh",
            backgroundColor: "darkgray",
            overflow: "auto",
            position: "relative", // Change to relative positioning
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={6} md={4}>
              <ProposeGameOptions />
            </Grid>
            <Grid item xs={6} md={4}>
              <ProposeGameOptions />
            </Grid>
            <Grid item xs={6} md={4}>
              <ProposeGameOptions />
            </Grid>
            <Grid item xs={6} md={4}>
              <ProposeGameOptions />
            </Grid>
          </Grid>
        </Box>{" "}
        <Box
          sx={{
            width: "70vw",
            height: "10vh",
            backgroundColor: "darkred",
            borderRadius: "10%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: 5,
          }}
        >
          <Typography variant="h3">Customise your own game</Typography>
        </Box>
        <CreatePersonalisedGame />
      </Box>
    </>
  );
}

export default GameOptions;
