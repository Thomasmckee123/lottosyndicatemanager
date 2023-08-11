import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import {
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Divider,
  Typography,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  createMessage,
  fetchBoardsAndMessagesFromSyndicates,
} from "../../services/messages";
import { Link, useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";

import GamePopup from "./components/popup";
import { NavigationRoutes } from "../../constants";

function ReviewMessages() {
  const [data, setData] = useState<any[]>([]);
  const { boardId, syndicateId, userSyndicateId } = useParams<{
    syndicateId: string;
    userSyndicateId: string;
    boardId: string;
  }>();
  // States
  const [selectedGame, setSelectedGame] = useState<any | null>(null); // Move this to the top level of the function
  const handleGameSelect = (game: any) => {
    setSelectedGame(game);
    let gameMessage = `Play Game - ${game.name} required ticket number : ${game.requiredTicketNumber} [gameId:${game.id}]`;

    setMessage((prevMessage) => `${prevMessage} ${gameMessage}`);
  };
  /**
   *
   * @param message getting the message Id
   * @returns
   */
  function extractGameId(message: string): string | null {
    const match = message.match(/\[gameId:(\d+)\]/);
    return match ? match[1] : null;
  }

  let [message, setMessage] = useState("");
  const [isGamePopupOpen, setIsGamePopupOpen] = useState(false);

  const getMessages = () => {
    fetchBoardsAndMessagesFromSyndicates(Number(boardId))
      .then((response) => {
        if (Array.isArray(response)) {
          setData(response);
        } else {
          console.error("API response is not an array:", response);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    getMessages();
  }, [syndicateId]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submit action
    try {
      if (userSyndicateId && boardId) {
        await createMessage(message, Number(userSyndicateId), Number(boardId));
        getMessages();
        setMessage(""); // reset the message field after a successful submit
      } else {
        console.error("Syndicate ID or Board ID is undefined!");
      }
    } catch (error) {
      console.error("Error creating message:", error);
    }
  };

  return (
    <Box sx={{ pb: 7 }}>
      <CssBaseline />
      <Card sx={{ my: 3, mx: "auto", maxWidth: 800 }}>
        <CardContent>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            Treasury: $50,000
          </Typography>
          <Divider />

          <Box sx={{ maxHeight: "60vh", overflowY: "auto", mt: 2 }}>
            <List>
              {data.map((item, index) => {
                const gameId = extractGameId(item.message);
                return (
                  <ListItem
                    button
                    key={`${index}-${item.userSyndicates.users.firstName}`}
                    style={gameId ? { backgroundColor: "darkgrey" } : {}}
                  >
                    <ListItemAvatar>
                      <Avatar alt="Profile Picture" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${new Date(
                        item.createdDate
                      ).toLocaleString()} - ${
                        item.userSyndicates.users.firstName
                      } ${item.userSyndicates.users.lastName}`}
                      secondary={
                        gameId ? (
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <Button
                              variant="contained" // filled button
                              color="primary" // default primary color
                              size="small" // adjust size as per your needs
                              sx={{
                                marginRight: "1rem", // spacing between button and the message
                                backgroundColor: "darkred", // make it red
                                "&:hover": {
                                  backgroundColor: "darkred", // darker shade on hover
                                },
                              }}
                            >
                              <Link
                                to={`/game/${gameId}/syndicates/${syndicateId}`}
                                style={{
                                  textDecoration: "none", // remove underline from link
                                  color: "inherit", // use inherited color (from Button)
                                }}
                              >
                                Play Game
                              </Link>
                            </Button>
                            {item.message}
                          </div>
                        ) : (
                          item.message
                        )
                      }
                    />
                  </ListItem>
                );
              })}
            </List>
          </Box>
          <Divider />
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  label="Enter Message"
                  id="enter-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </Grid>
              <Grid item xs={2}>
                <Box sx={{ pb: 7 }}>
                  <Tooltip title="select games">
                    <IconButton
                      color="primary"
                      aria-label="propose a game"
                      component="span"
                      onClick={() => setIsGamePopupOpen(true)}
                    >
                      <AddIcon />
                    </IconButton>
                  </Tooltip>
                  <GamePopup
                    isOpen={isGamePopupOpen}
                    handleClose={() => setIsGamePopupOpen(false)}
                    handleGameSelect={handleGameSelect} // pass the handleGameSelect function
                  />
                </Box>
              </Grid>
              <Grid item xs={2}>
                <Tooltip title="create a game">
                  <IconButton
                    sx={{ color: "darkRed" }}
                    aria-label="create a game"
                    component={Link}
                    to={NavigationRoutes.CREATEGAME.replace(
                      ":syndicateId",
                      `${syndicateId}`
                    ).replace(":userSyndicateId", `${userSyndicateId}`)}
                  >
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="contained"
                  color="error"
                  sx={{ height: "100%", width: "100%" }}
                  type="submit"
                >
                  Send
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ReviewMessages;
