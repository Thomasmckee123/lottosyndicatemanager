import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
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
import TokenUtils from "../../integrations/token";
import {
  createMessage,
  fetchBoardsAndMessagesFromSyndicates,
} from "../../utils/messages";
import { Link, useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import { NavigationRoutes } from "../../constants";
import { date } from "yup";

function ReviewMessages() {
  const [value, setValue] = React.useState(0);
  const [data, setData] = useState<any[]>([]);
  const jwt = TokenUtils.getJWT();
  const { syndicateId, user_syndicate_id } = useParams<{
    syndicateId: string;
    user_syndicate_id: string;
  }>();
  const { boardId } = useParams<{ boardId: string }>();
  const [message, setMessage] = useState("");
  useEffect(() => {
    fetchBoardsAndMessagesFromSyndicates(Number(syndicateId))
      .then((response) => {
        setData(response[0]);
        if (Array.isArray(response)) {
          setData(response);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [syndicateId]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submit action
    try {
      if (user_syndicate_id && boardId) {
        await createMessage(
          message,
          Number(user_syndicate_id),
          Number(boardId)
        );
        setMessage(""); // reset the message field after a successful submit
      } else {
        console.error("Syndicate ID or Board ID is undefined!");
      }
    } catch (error) {
      console.error("Error creating message:", error);
    }
  };

  //In your return JSX
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
              {data.map((item, index) =>
                item.board_message.map((message: any, messageIndex: any) => (
                  <ListItem
                    button
                    key={`${index}-${messageIndex}-${message.user_syndicates.users.first_name}`}
                  >
                    <ListItemAvatar>
                      <Avatar alt="Profile Picture" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${new Date(
                        message.created_date
                      ).toLocaleString()} - ${
                        message.user_syndicates.users.first_name
                      } ${message.user_syndicates.users.last_name}`}
                      secondary={message.message}
                    />
                  </ListItem>
                ))
              )}
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
                <Tooltip title="create games">
                  <IconButton
                    color="primary"
                    aria-label="Create Game"
                    component="span"
                  >
                    <Link
                      to={NavigationRoutes.CREATEGAME.replace(
                        ":syndicateId",
                        `${syndicateId}`
                      )}
                    >
                      <AddIcon />
                    </Link>
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
