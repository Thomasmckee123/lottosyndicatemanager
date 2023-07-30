import { Box, Grid, InputAdornment, TextField } from "@mui/material";
import * as React from "react";

function CreatePersonalisedGame() {
  return (
    <>
      <Box
        sx={{
          width: "70vw",
          height: "70vh",
          backgroundColor: "darkGrey",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={6}>
            <TextField
              id="game-name"
              label="Game Name"
              variant="filled"
              fullWidth
              sx={{ fieldset: { backgroundColor: "white" } }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="game-description"
              label="Game Description"
              variant="filled"
              fullWidth
              sx={{ fieldset: { backgroundColor: "white" } }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="total-reward"
              label="Total Reward"
              variant="filled"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              sx={{ fieldset: { backgroundColor: "white" } }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="draw-date"
              label="Draw Date"
              type="date"
              defaultValue="2023-01-01"
              variant="filled"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ fieldset: { backgroundColor: "white" } }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="reward"
              label="Reward"
              variant="filled"
              fullWidth
              sx={{ fieldset: { bgcolor: "white" } }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="required-ticket-number"
              label="Required Ticket Number"
              type="number"
              variant="filled"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ fieldset: { backgroundColor: "white" } }}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default CreatePersonalisedGame;
