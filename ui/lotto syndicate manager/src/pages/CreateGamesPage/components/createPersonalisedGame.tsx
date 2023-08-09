import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { createGame } from "../../../services/games";
import { Box, Grid, InputAdornment, TextField, Button } from "@mui/material";

function CreatePersonalisedGame() {
  const { syndicateId, user_syndicate_id } = useParams<{
    syndicateId: string;
    user_syndicate_id: string;
  }>();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [total_reward, setTotalReward] = useState(0);
  const [draw_date, setDrawDate] = useState("2023-01-01T00:00");
  const [reward, setReward] = useState(0);
  const [required_ticket_number, setRequiredTicketNumber] = useState(0);

  // Placeholder for the image - you'll need to handle file upload
  const [image, setImage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (user_syndicate_id) {
      await createGame(
        name,
        new Date(draw_date),
        reward,
        image,
        required_ticket_number,
        Number(user_syndicate_id)
      );

      setName("");
      setDescription("");
      setTotalReward(0);
      setDrawDate("2023-01-01T00:00");

      setReward(0);
      setRequiredTicketNumber(0);
      setImage("");
    } else {
      console.error("User Syndicate ID is undefined!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ fieldset: { backgroundColor: "white" } }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="game-description"
              label="Game Description"
              variant="filled"
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{ fieldset: { backgroundColor: "white" } }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="total-reward"
              label="Total Reward"
              variant="filled"
              fullWidth
              value={total_reward}
              onChange={(e) => setTotalReward(Number(e.target.value))}
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
              type="datetime-local"
              value={draw_date}
              onChange={(e) => setDrawDate(e.target.value)}
              variant="filled"
              fullWidth
              InputLabelProps={{ shrink: true }}
              sx={{ fieldset: { backgroundColor: "white" } }}
            />
          </Grid>
          <Grid item xs={6}>
            <input
              accept="image"
              id="game-image"
              type="file"
              onChange={(e) => setImage(e.target.value)}
            />
            <label htmlFor="game-image"></label>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="reward"
              label="Reward"
              variant="filled"
              fullWidth
              value={reward}
              onChange={(e) => setReward(Number(e.target.value))}
              sx={{ fieldset: { bgcolor: "white" } }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="required-ticket-number"
              label="Required Ticket Number"
              type="number"
              value={required_ticket_number}
              onChange={(e) => setRequiredTicketNumber(Number(e.target.value))}
              variant="filled"
              fullWidth
              InputLabelProps={{ shrink: true }}
              sx={{ fieldset: { backgroundColor: "white" } }}
            />
          </Grid>
        </Grid>
        <Button type="submit">Create Game</Button>
      </Box>
    </form>
  );
}

export default CreatePersonalisedGame;
