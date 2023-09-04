/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Box,
  CssBaseline,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Divider,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import {
  createMessage,
  fetchingMessagesByBoardId,
  fetchingMessagesByGameId,
} from "../../../services/messages";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createNewBoard, updateBoards } from "../../../services/board";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { NavigationRoutes } from "../../../constants";
import {
  fetchUserGamesByGameId,
  fetchUserGamesByUserGameId,
  updateRole,
} from "../../../services/userGames";
import PercentagesDrawer from "./PercentagesDrawer";
import { StyledPaper, StyledPaperTop } from "../styles/styled";
import moment from "moment";

function GameChat() {
  const [openDialog, setOpenDialog] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");

  const [data, setData] = useState<any>();
  const [messageData, setMessageData] = useState<any[]>([]);
  const [message, setMessage] = useState<any>();
  const { gameId } = useParams<{ gameId: string }>();
  const { userGameId } = useParams<{ userGameId: string }>();
  const [boardId, setBoardId] = useState<any>();
  const [mappedPlayers, setMappedPlayers] = useState<any[]>([]);
  const [userGameData, setUserGameData] = useState<any>();

  const handleOpenDialog = () => {
    setNewBoardName(data?.name || ""); // initializing with the current board name
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleSaveNameChange = async (name: string) => {
    const response = await updateBoards(boardId, name);
    if (response && response.name) {
      setData((prevData: typeof data) => ({
        ...prevData,
        name: response.name,
      }));
    }

    handleCloseDialog();
  };
  const navigate = useNavigate();

  const handleGettingMessages = async () => {
    fetchingMessagesByGameId(Number(gameId))
      .then((response) => {
        console.log("RESPONSE", response);
        if (response[0]) {
          setData(response[0]);
          setBoardId(response[0].id);
        } else {
          createNewBoard(Number(gameId)).then(() => {
            navigate(0);
          });
        }
        return response[0].id;
      })
      .then((boardId) => fetchingMessagesByBoardId(Number(boardId)))
      .then((response) => setMessageData(response))
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  console.log("Message Data", messageData);

  const fetchUserData = () => {
    fetchUserGamesByGameId(Number(gameId)).then((response) => {
      console.log("RESPONSE", response);
      setMappedPlayers(response);
    });
  };
  useEffect(() => {
    fetchUserData();
  }, [gameId]);

  if (mappedPlayers.length > 0) {
    const firstUserGameId = mappedPlayers[0].id;
    console.log("firstUserGameId", firstUserGameId);
    updateRole(Number(firstUserGameId));
  }

  useEffect(() => {
    handleGettingMessages();
  }, []);

  console.log("userGameId", userGameId);
  const handleMessageChange = (userInput: string) => {
    setMessage(userInput);
  };

  const handleSubmitMessage = async () => {
    if (message) {
      createMessage(message, Number(userGameId), Number(boardId));
      handleGettingMessages();
    }
  };
  return (
    <>
      {" "}
      <StyledPaperTop>
        <PercentagesDrawer
          userData={mappedPlayers}
          fetchUserData={fetchUserData}
        />{" "}
        <Typography sx={{ color: "white", size: "80%" }}>
          {mappedPlayers[0]?.games?.gameTypes?.name}
        </Typography>
      </StyledPaperTop>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Board Name</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a new name for the board:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Board Name"
            type="text"
            fullWidth
            value={newBoardName}
            onChange={(e) => setNewBoardName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => handleSaveNameChange(newBoardName.toString())}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Box sx={{ pb: 7 }}>
        <CssBaseline />
        <Card
          sx={{
            my: 3,
            mx: "auto",
            maxWidth: 800,
            boxShadow: "0px 0px 10px black",
          }}
        >
          <CardContent>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs>
                <Typography variant="h5" color="text.secondary" gutterBottom>
                  {data?.name}
                </Typography>
              </Grid>
              <Grid item>
                <IconButton
                  sx={{ color: "darkred" }}
                  aria-label="edit title"
                  onClick={handleOpenDialog}
                >
                  <EditIcon />
                </IconButton>
              </Grid>
            </Grid>

            <Divider />
            <Box sx={{ maxHeight: "60vh", overflowY: "auto", mt: 2 }}>
              <List>
                {messageData.map((item, index) => (
                  <ListItem key={`${index}-${item.user}`}>
                    <ListItemAvatar>
                      <Avatar
                        src={item?.userGames?.users?.image}
                        alt="Profile Picture"
                        sx={{ width: "50px", height: "50px" }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={moment(item?.createdDate).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}
                      {...item?.userGames?.users?.firstName}
                      secondary={item?.message}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
            <Divider />
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  label="Enter Message"
                  id="enter-message"
                  onChange={(e) => handleMessageChange(e.target.value)}
                />
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={2}>
                <Button
                  variant="contained"
                  color="error"
                  sx={{
                    height: "100%",
                    width: "100%",
                    backgroundColor: "darkred",
                  }}
                  onClick={handleSubmitMessage}
                >
                  Send
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}

export default GameChat;
