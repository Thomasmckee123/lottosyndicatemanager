import {
  Typography,
  Grid,
  Card,
  CardContent,
  Tabs,
  Box,
  Tab,
  CardMedia,
  Button,
  ButtonGroup,
  Paper,
  createTheme,
  ThemeProvider,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { fetchGamesWePlay } from "../../../services/gameTypes";
import {
  createGame,
  createNormalGame,
  fetchGameById,
  fetchGamesByTypeID,
} from "../../../services/games";
import TokenUtils from "../../../integrations/token";
import { fetchmembersInGroup, joinGame } from "../../../services/joiningGames";
import DepositDialog from "./deposit";
import { Link, useNavigate, useParams } from "react-router-dom";
import CountDown from "../../../components/countdown";
import {
  updateBalance,
  updateTreasury,
} from "../../../services/depositAndWithdraw";
import InsufficientFunds from "./insufficientFunds";
import { fetchUserGamesByGameId } from "../../../services/userGames";
import {
  ICustomTab,
  IGame,
  IGameMember,
  IGameType,
  IMember,
  IMemberPerGame,
} from "../../../interfaces";
import fetchUserDetails from "../../../services/users";
import { NavigationRoutes } from "../../../constants";
import { fetchUserSyndicateByUserSyndicateId } from "../../../services/userSyndicate";
import GameDropDown from "./gameDropDown";
import CloseIcon from "@mui/icons-material/Close";
function GameTypes(currentUserRank: { currentUserRank: any }) {
  const { syndicateId, userSyndicateId } = useParams<{
    syndicateId: string;
    userSyndicateId: string;
  }>();
  const [value, setValue] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isFundsOpen, setIsFundsOpen] = useState<boolean>(false);
  const [gameTypeData, setGameTypeData] = useState<IGameType[]>([]);
  const [gameData, setGameData] = useState<IGame[]>([]);
  const [gameTypeId, setGameTypeId] = useState<number>();
  const [deposit, setDeposit] = useState<number | null>(null);
  const [gameId, setGameId] = useState<number | null>(null);
  const [usersPerGame, setUsersPerGame] = useState<Record<number, number>>({});
  const [membersPerGame, setMembersPerGame] = useState<IMemberPerGame>([]);
  const [balanceData, setBalanceData] = useState<any>();
  const [joinedMessage, setJoinedMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [userId, setUserId] = useState<number>();
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const navigate = useNavigate();
  const handleChange = (
    _event: React.ChangeEvent<object>,
    newValue: number
  ) => {
    setValue(newValue);
  };

  const greyButtonIfGameMade = async (gameTypeId: number) => {
    const response = await fetchGamesByTypeID(gameTypeId, Number(syndicateId));
    const filteredResponse = response.filter(
      (game) => game.maximumPlayers > 200
    );
    const hasGame = filteredResponse.length > 0;

    return hasGame;
  };
  const handleCreateGame = async (gameTypeId: number) => {
    const hasGame = await greyButtonIfGameMade(gameTypeId);
    if (hasGame) {
      // Display error snackbar
      setSnackbarMessage("Game already created!");
    } else {
      // Create game
      createNormalGame(Number(gameTypeId), Number(syndicateId));
      await getGames();
      navigate(0);
      // Display success snackbar
      setSnackbarMessage("Game created successfully!");
    }
    setSnackbarOpen(true);
  };

  useEffect(() => {
    fetchUserSyndicateByUserSyndicateId(Number(userSyndicateId)).then(
      (response) => {
        setUserId(response?.data?.userId);
      }
    );
  }, []);
  const getUserDetails = async () => {
    const response = await fetchUserDetails(userId.toString());
    setBalanceData(response.data);
  };
  const balance = balanceData?.balance!;
  useEffect(() => {
    getUserDetails();
  }, [userId]);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  const handleOpenFunds = () => {
    setIsFundsOpen(true);
  };
  const handleCloseFunds = () => {
    setIsFundsOpen(false);
  };
  const getCurrentTreasury = async (gameId: number) => {
    const game = await fetchGameById(gameId);
    return game.treasury;
  };

  const handleJoinGame = async () => {
    try {
      const currentTreasury = await getCurrentTreasury(Number(gameId));
      const newTreasury = currentTreasury + Number(deposit);
      const newBalance = balance! - newTreasury;

      if (newBalance > 0) {
        let response = await joinGame(
          new Date(),
          Number(deposit),
          Number(gameId),
          Number(userId)
        );
        await updateBalance(newBalance!);
        await updateTreasury(newTreasury, Number(gameId));
        await getGames();
        return response;
      } else {
        handleOpenFunds();
      }
    } catch (error) {
      console.error("couldn't join game");
    }
  };

  const handleCreateNewGame = async (typeId: number) => {
    const newGame = await createGame(0, Number(syndicateId), Number(typeId));
    setGameId(newGame.id);
    await getGames();
  };

  useEffect(() => {
    gameData.forEach((game) => handleMembersInGroupChange(game.id));
  }, [gameData]);

  const handleMembersInGroupChange = async (gameId: number) => {
    try {
      const response: IMember[] = await fetchmembersInGroup(Number(gameId));

      setMembersPerGame((prevMembersPerGame) => ({
        ...prevMembersPerGame,
        [Number(gameId)]: response,
      }));

      setUsersPerGame((prevUsersPerGame) => ({
        ...prevUsersPerGame,
        [Number(gameId)]: response.length,
      }));
    } catch (error) {
      console.error("Error fetching members in group:", error);
    }
  };
  const fetchMembers = async (someGameId: number) => {
    await handleMembersInGroupChange(someGameId);
  };

  const currencyFormatter = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  });

  useEffect(() => {
    fetchGamesWePlay()
      .then((response) => {
        if (Array.isArray(response)) {
          setGameTypeData(response);
        } else {
          console.error("Unexpected data format:", response);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  async function getGames() {
    if (gameTypeId) {
      setGameData([]);
      try {
        const response = await fetchGamesByTypeID(
          gameTypeId,
          Number(syndicateId)
        );
        const filteredResponse = response.filter(
          (game) => game.maximumPlayers < 20
        );
        setGameData(filteredResponse);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    }
  }

  useEffect(() => {
    getGames();
  }, [gameTypeId]);

  const handlePlayGame = async (gtypeId: number) => {
    setGameTypeId(gtypeId);
    const allGamesForType: IGameMember[] = await fetchGamesByTypeID(
      gtypeId,
      Number(syndicateId)
    );
    handleOpenDialog();
    if (allGamesForType.length > 0) {
      const availableGame = allGamesForType.find((item) => {
        typeof usersPerGame[item.id] === "number" &&
          item.maximumPlayers &&
          Number(usersPerGame[item.id]) < Number(item.maximumPlayers);
      });
      if (availableGame) {
        setGameId(availableGame.id);
        handleJoinGame();
        await getGames();
      } else {
        setGameTypeId(gtypeId);
        handleCreateNewGame(gtypeId);
      }
    } else {
      await handleCreateNewGame(gtypeId);
    }
  };

  const handleTabClick = (id: number) => {
    setGameTypeId(id);
  };
  const CustomTabPanel = (props: ICustomTab) => {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && children}
      </div>
    );
  };

  const handleJoinClick = async (gameToJoin: IGame) => {
    const userGameExists = await fetchUserGamesByGameId(gameToJoin.id);

    let userIdExists = false;
    for (let i = 0; i < userGameExists.length; i++) {
      if (
        Number(userGameExists[i].users.id) === Number(userId) &&
        Number(userGameExists[i].games.syndicates.id) !== Number(syndicateId)
      ) {
        userIdExists = true;
        break;
      }
    }
    if (!userIdExists) {
      if (
        typeof usersPerGame[gameToJoin.id] === "number" &&
        gameToJoin.maximumPlayers &&
        Number(usersPerGame[gameToJoin.id]) < Number(gameToJoin.maximumPlayers)
      ) {
        handleOpenDialog();

        setGameId(gameToJoin.id);
      } else {
        console.error("Maximum players reached for this game.", gameToJoin);
        setGameTypeId(gameToJoin.gameTypes.id);

        handleCreateNewGame(gameToJoin.gameTypes.id);
        await getGames();
        handleOpenDialog();
        setGameId(gameToJoin.id);
      }
    } else {
      setJoinedMessage("you have already joined this game type,");
      setOpenSnackbar(true);
    }
  };

  const matchUserToGame = (matchGameId: number) => {
    return membersPerGame[matchGameId]?.find(
      (member) => member.users.id === userId
    )
      ? true
      : false;
  };

  const lightTheme = createTheme({ palette: { mode: "light" } });
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <>
        {/* your existing code here */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert severity="warning" sx={{ width: "100%" }}>
            <Typography variant="h5" component="div">
              {joinedMessage}
            </Typography>
            <Typography variant="body1" component="div">
              Please select a different syndicate to join.
            </Typography>
          </Alert>
        </Snackbar>
      </>
      <InsufficientFunds
        open={isFundsOpen}
        onClose={handleCloseFunds}
        funds={balance!}
        deposit={Number(deposit)}
      />
      <ThemeProvider theme={lightTheme}>
        <Paper
          elevation={24}
          sx={{
            p: 4,
            height: "10vh",
            backgroundColor: `darkRed`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "2%",
          }}
        >
          <Typography
            variant="h4"
            component="div"
            gutterBottom
            style={{ textAlign: "center" }}
            color={"white"}
          >
            Games We play
          </Typography>
        </Paper>
      </ThemeProvider>
      <Grid container spacing={3}>
        {gameTypeData.map((thisGameType) => (
          <>
            <Grid item xs={12} md={6} lg={4} key={thisGameType.id}>
              <GameDropDown
                userId={userId}
                title={`Play - ${thisGameType.name}`}
                gameTypeId={Number(thisGameType.id)}
                syndicateId={Number(syndicateId)}
                roleId={Number(currentUserRank.currentUserRank)}
                userSyndicateId={Number(userSyndicateId)}
              />
              <DepositDialog
                open={isDialogOpen}
                onClose={handleCloseDialog}
                deposit={deposit}
                setDeposit={setDeposit}
                handleJoinGame={handleJoinGame}
                minDeposit={20}
              />

              <Card sx={{ backgroundColor: "darkGrey" }}>
                <CardMedia
                  component="img"
                  height="295"
                  image={thisGameType.image}
                  alt={thisGameType.name}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {thisGameType.name}
                  </Typography>
                  <Typography variant="body1" component="p">
                    Jackpot:{" "}
                    {currencyFormatter
                      .format(thisGameType.reward)
                      .replace(".00", "")}
                  </Typography>
                  <Typography variant="body1" component="div">
                    <CountDown
                      drawDate={thisGameType.drawDate}
                      gameId={thisGameType.id}
                    />
                  </Typography>
                </CardContent>
                <ButtonGroup
                  variant="contained"
                  color="primary"
                  aria-label="join random group buttons"
                  sx={{
                    display: "flex",
                    mt: 1,
                    mx: 2,
                    mb: 2,
                    backgroundColor: "darkred",
                  }}
                >
                  {currentUserRank &&
                  (Number(currentUserRank.currentUserRank) === 1 ||
                    Number(currentUserRank.currentUserRank) === 3) ? (
                    <>
                      <Button
                        fullWidth
                        sx={{ backgroundColor: "darkred" }}
                        onClick={() => {
                          handlePlayGame(Number(thisGameType.id));
                        }}
                      >
                        Create a mini game.
                      </Button>
                      <Button
                        fullWidth
                        sx={{ backgroundColor: "darkred" }}
                        onClick={() => {
                          handleCreateGame(thisGameType.id);
                        }}
                        onClickCapture={() =>
                          console.log(
                            `Game Type ID: ${
                              thisGameType.id
                            }, Disabled: ${greyButtonIfGameMade(
                              thisGameType.id
                            )}`
                          )
                        }
                      >
                        Create a normal game.
                      </Button>
                      <Snackbar
                        open={snackbarOpen}
                        autoHideDuration={3000}
                        onClose={() => setSnackbarOpen(false)}
                        message={snackbarMessage}
                        action={
                          <IconButton
                            size="small"
                            color="inherit"
                            onClick={() => setSnackbarOpen(false)}
                          >
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        }
                      />
                    </>
                  ) : null}
                </ButtonGroup>
              </Card>
            </Grid>
          </>
        ))}
      </Grid>
      <ThemeProvider theme={lightTheme}>
        <Paper
          elevation={24}
          sx={{
            p: 4,
            height: "10vh",
            backgroundColor: `darkRed`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "2%",
          }}
        >
          <Typography
            variant="h4"
            component="div"
            gutterBottom
            style={{ textAlign: "center" }}
            color={"white"}
          >
            Join A mini Game
          </Typography>
        </Paper>
      </ThemeProvider>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value === 0 ? false : value}
          onChange={handleChange}
          aria-label="game tabs"
          sx={{
            backgroundColor: "white",
            maxWidth: "100%",
            overflowX: "auto",
            flexWrap: "nowrap",
          }}
          variant="scrollable"
          scrollButtons="auto"
        >
          {gameTypeData.map((tabGameType) => (
            <Tab
              label={tabGameType.name}
              value={tabGameType.id}
              key={tabGameType.id}
              onClick={() => {
                handleTabClick(tabGameType.id);
                fetchMembers(tabGameType.id);
              }}
            />
          ))}
        </Tabs>{" "}
      </Box>{" "}
      <ThemeProvider theme={lightTheme}>
        <Paper
          elevation={24}
          sx={{
            p: 4,
            zIndex: -1,
            height: "40vh",
            backgroundColor: `darkGrey`,
            overflowX: "auto",
          }}
        >
          {gameData.length > 0 ? (
            gameData.map((currentGame) => (
              <CustomTabPanel
                value={value}
                index={currentGame.gameTypes.id}
                key={currentGame.id}
              >
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {currentGame?.gameTypes?.name} {currentGame.id}
                    </Typography>
                    <Typography variant="body1" component="p">
                      Reward: {currentGame?.gameTypes.reward}
                    </Typography>
                    <Typography variant="body1" component="p">
                      Members:{usersPerGame[currentGame.id] || 0}/
                      {currentGame?.maximumPlayers}
                    </Typography>
                    <Typography variant="body1" component="p">
                      Treasury: {currentGame?.treasury}
                    </Typography>

                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ backgroundColor: "darkred" }}
                      disabled={matchUserToGame(currentGame.id)}
                      onClick={() => handleJoinClick(currentGame)}
                    >
                      {matchUserToGame(currentGame.id)
                        ? "You have joined this game"
                        : "Join"}
                    </Button>
                    {matchUserToGame(currentGame.id) && (
                      <Link
                        to={NavigationRoutes.GAMEMESSAGE.replace(
                          ":userGameId",
                          `${currentGame.gameTypes.id}`
                        ).replace(":gameId", `${currentGame.id}`)}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          sx={{ backgroundColor: "darkRed" }}
                        >
                          Play Game
                        </Button>
                      </Link>
                    )}
                  </CardContent>
                </Card>
              </CustomTabPanel>
            ))
          ) : (
            <ThemeProvider theme={lightTheme}>
              <Paper
                elevation={24}
                sx={{
                  p: 4,
                  zIndex: -1,
                  height: "40vh",
                  backgroundColor: `darkGrey`,
                  overflowX: "auto",
                }}
              >
                <Typography variant="h5" component="div">
                  No games available.
                </Typography>
              </Paper>
            </ThemeProvider>
          )}{" "}
        </Paper>
      </ThemeProvider>
    </>
  );
}

export { GameTypes };
