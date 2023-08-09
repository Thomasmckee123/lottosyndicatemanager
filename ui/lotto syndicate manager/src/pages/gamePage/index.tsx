import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Modal,
  TextField,
} from "@mui/material";
import { fetchGamesById } from "../../services/games";
import { createTicket } from "../../services/tickets";

const GamePage = () => {
  const { gameId, syndicateId } = useParams<{
    gameId: string;
    syndicateId: string;
  }>();
  const [data, setData] = useState<any | null>(null);
  const [open, setOpen] = useState(false);
  const [ticket_code, setTicketNumber] = useState("");
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (syndicateId && gameId) {
      await createTicket(ticket_code, Number(syndicateId), Number(gameId));

      setTicketNumber("");
    } else {
      console.error("User Syndicate ID is undefined!");
    }
  };
  useEffect(() => {
    fetchGamesById(Number(gameId))
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  console.log(data);

  const countDownDate = () => {
    const now = new Date();
    const drawDate = new Date(data?.draw_date);
    const difference = drawDate.getTime() - now.getTime();

    if (difference <= 0) {
      return "The draw has ended!";
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 5,
      }}
    >
      <Card sx={{ width: "90%", maxWidth: 800, mb: 3 }}>
        <CardMedia
          component="img"
          height="300"
          src={data?.image}
          alt="Cover image"
        />
        <CardContent>
          <Typography variant="h4" component="div" gutterBottom>
            {data?.name}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Reward: ${data?.reward}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Required Ticket Number: {data?.required_ticket_number}
          </Typography>

          <Typography variant="h6" gutterBottom>
            Countdown:{countDownDate()}
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Add Tickets
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                borderRadius: "10px",
              }}
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Add Ticket
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Enter your ticket code below:
              </Typography>

              <Box component="form" sx={{ mt: 2 }} onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Ticket Code"
                  variant="outlined"
                  type="text"
                  value={ticket_code}
                  onChange={(e) => setTicketNumber(e.target.value)}
                />
                <Button
                  type="submit"
                  sx={{ mt: 2 }}
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => {
                    console.log("Submitting ticket code...");
                  }}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </Modal>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              console.log("Checking other's tickets...");
            }}
          >
            Check Other Tickets
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleOpen}>
            Check My Tickets
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default GamePage;
