import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Paper,
  styled,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import {
  createNewBoard,
  fetchBoardsBySyndicateId,
  fetchUserRelationship,
  updateUserRole,
} from "../../services/board";
import { NavigationRoutes } from "../../constants";
import {
  deleteUserSyndicate,
  fetchUserBySyndicateId,
} from "../../services/members";
import { GameTypes } from "./components/gameTypesPage";
import TokenUtils from "../../integrations/token";
import PlayOrView from "./components/playOrViewArchive";

function MessageBoardsPage() {
  const [open, setOpen] = useState(false);
  const [boardName, setBoardName] = useState("");
  const [manageMembersOpen, setManageMembersOpen] = useState(false);
  const [memberData, setMemberData] = useState([]);
  const [relationshipData, setRelationshipData] = useState<any>(null);
  const [data, setData] = useState<any>(null);
  const [role, setRole] = useState<any>(0);
  const [balanceData, setBalanceData] = useState<any>(null);
  const { syndicateId, userSyndicateId } = useParams<{
    syndicateId: string;
    userSyndicateId: string;
  }>();
  const [review, setReview] = useState("");

  const handleManageMembersOpen = () => {
    setManageMembersOpen(true);
  };
  const handleManageMembersClose = () => {
    setManageMembersOpen(false);
  };
  const getMembers = () => {
    fetchUserBySyndicateId(Number(syndicateId)).then((response) => {
      console.log("Raw Response:", response);
      if (typeof response === "string") {
        response = JSON.parse(response);
      }
      setMemberData(response);
    });
  };
  useEffect(() => {
    getMembers();
  }, [syndicateId]);
  // Handlers for Dialog operations
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    // Handle submitting the review
    console.log(review);
    handleClose();
  };
  /**
   * promoting/demoting the users
   * @param roleId
   * @param userSyndicateId
   */
  const update = async (roleId: number, userSyndicateId: number) => {
    try {
      await updateUserRole(userSyndicateId, roleId);
      setRole(roleId);
    } catch (error) {
      console.log("error updating role");
    }
    getMembers();
  };
  const handleWriteReviewOpen = () => {
    setOpen(true);
  };
  const removeMember = async (userSyndicateId: number) => {
    try {
      await deleteUserSyndicate(userSyndicateId);
      console.log("deleted");
    } catch (error) {
      console.log("error deleting user");
    }
    getMembers();
  };
  /**
   * getting the user's role
   */
  function userRole() {
    console.log(userSyndicateId);
    fetchUserRelationship(Number(userSyndicateId))
      .then((response) => {
        console.log(response);
        setRelationshipData(response);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
  useEffect(() => {
    console.log(relationshipData);
    if (relationshipData) {
      console.log(relationshipData.roleId);
    }
  }, [relationshipData]);

  useEffect(() => {
    userRole();
    fetchBoardsBySyndicateId(Number(syndicateId))
      .then((response) => {
        console.log(response);
        setData(response);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [syndicateId]);
  console.log(relationshipData?.roleId);
  console.log("data", relationshipData);
  let currentUserRank = relationshipData?.roleId;
  console.log("current user rank", currentUserRank);
  const handleReviewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReview(event.target.value);
  };

  const lightTheme = createTheme({ palette: { mode: "light" } });
  return (
    <Box>
      <Paper
        sx={{
          height: "50vh",
          backgroundImage: `url(${relationshipData?.syndicates?.avatar})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></Paper>{" "}
      <Typography variant="h4" component="h1" color="black"></Typography>
      <ThemeProvider theme={lightTheme}>
        <Paper elevation={24} sx={{ p: 4 }}>
          <Typography
            variant="h4"
            component="div"
            gutterBottom
            style={{ textAlign: "center" }}
          >
            Welcome to {relationshipData?.syndicates?.name}!
          </Typography>
        </Paper>
      </ThemeProvider>{" "}
      <Box sx={{ flexGrow: 1, m: 3 }}>
        <Box mb={3}>
          <Typography variant="h6" component="div" gutterBottom>
            Actions
          </Typography>
          {currentUserRank == 1 && (
            <>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleManageMembersOpen}
              >
                Manage Members
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleWriteReviewOpen}
              >
                Write a Review
              </Button>
            </>
          )}
        </Box>

        <Dialog
          open={manageMembersOpen}
          onClose={handleManageMembersClose}
          aria-labelledby="manage-members-dialog"
        >
          <DialogTitle id="manage-members-dialog">Manage Members</DialogTitle>
          <DialogContent>
            {memberData.map((member: any) => (
              <Box
                key={member.users.id}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Typography variant="body1">
                  {member.users.firstName} {member.users.lastName + ": "}{" "}
                  {member.roles.name}
                </Typography>
                <Box>
                  {currentUserRank < member.roles.id && (
                    <>
                      <>
                        <Button
                          variant="outlined"
                          color="primary"
                          sx={{ mx: 1 }}
                          onClick={() => update(3, Number(member.id))}
                        >
                          Promote
                        </Button>
                        <Button
                          variant="outlined"
                          color="primary"
                          sx={{ mx: 1 }}
                          onClick={() => update(2, Number(member.id))}
                        >
                          Demote
                        </Button>
                      </>
                      <Button
                        variant="contained"
                        color="error"
                        sx={{ mx: 1 }}
                        onClick={() => deleteUserSyndicate(Number(member.id))}
                      >
                        Kick Out
                      </Button>
                    </>
                  )}
                </Box>
              </Box>
            ))}
          </DialogContent>
        </Dialog>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Write a Review</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Review"
              fullWidth
              value={review}
              onChange={handleReviewChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogActions>
        </Dialog>
        <Typography variant="h4" component="div" gutterBottom></Typography>
        <Grid container spacing={3}>
          {data &&
            data.map((board: any) => (
              <Grid item xs={12} md={6} lg={4} key={board.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {board.name}
                    </Typography>
                    <Link
                      to={NavigationRoutes.BOARDCHAT.replace(
                        ":syndicateId",
                        `${syndicateId}`
                      )
                        .replace(":boardId", `${board.id}`)
                        .replace(
                          ":userSyndicateId",
                          `${Number(userSyndicateId)}`
                        )}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                      >
                        Enter Board
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
        <GameTypes />
        <PlayOrView />
      </Box>
    </Box>
  );
}

export default MessageBoardsPage;
