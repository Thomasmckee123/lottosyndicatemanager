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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { fetchGamesWePlay } from "../../../services/gameTypes";
import {
  createGame,
  fetchGameById,
  fetchGamesByTypeID,
} from "../../../services/games";
import TokenUtils from "../../../integrations/token";
import { fetchmembersInGroup, joinGame } from "../../../services/joiningGames";
import DepositDialog from "./deposit";
import { useParams } from "react-router-dom";
import { useCountdown } from "../../../hooks/useCountdown";
import CountDown from "../../../components/countdown";
import {
  updateBalance,
  updateTreasury,
} from "../../../services/depositAndWithdraw";
import InsufficientFunds from "./insufficientFunds";

function GameTypes() {
  const { syndicateId, userSyndicateId } = useParams<{
    syndicateId: string;
    userSyndicateId: string;
  }>();

  const [value, setValue] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isFundsOpen, setIsFundsOpen] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);
  const [gameData, setGameData] = useState<any[]>([]);
  const [gameTypeId, setGameTypeId] = useState<number>();
  const [deposit, setDeposit] = useState<number | null>(null);
  const [gameId, setGameId] = useState<number | null>(null);
  const [usersPerGame, setUsersPerGame] = useState<Record<number, number>>({});
  const [maximumPlayers, setMaximumPlayers] = useState<number | null>(null);
  const [treasury, setTreasury] = useState<number | null>(null);
  const [balanceData, setBalanceData] = useState<any>(null);

  const jwt = TokenUtils.getJWT();
  const userId = jwt.claims.userId;
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  useEffect(() => {
    const jwt = TokenUtils.getJWT();
    setBalanceData(jwt);
  }, []);

  const balance = balanceData?.claims?.balance;
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
    console.log("join game id", gameId);
    try {
      const currentTreasury = await getCurrentTreasury(Number(gameId));

      // Calculate new treasury value
      const newTreasury = currentTreasury + Number(deposit);
      const newBalance = balance - newTreasury;
      console.log("new Treasury", newTreasury);
      console.log("newBalance", newBalance);
      //update balance
      if (newBalance > 0) {
        await joinGame(
          new Date(),
          Number(deposit),
          Number(gameId),
          Number(userId)
        );

        // Get current treasury value

        await updateBalance(Number(userId), newBalance);
        // Update treasury with new value
        await updateTreasury(newTreasury, Number(gameId));
      } else {
        handleOpenFunds();
      }
      // Reload game data
      await getGames();
    } catch (error) {
      console.log("couldn't join game");
    }
  };

  const handleCreateNewGame = async () => {
    getGames();
    console.log("HANDLE CREATE GAME TYPE ID", gameTypeId);
    const newGame = await createGame(
      Number(maximumPlayers),
      0,
      Number(userSyndicateId),
      Number(gameTypeId)
    );
    setGameId(newGame.id);
  };

  useEffect(() => {
    gameData.forEach((game) => handleMembersInGroupChange(game.id));
  }, [gameData]);
  /**
   * setting the different members within the group
   */
  const handleMembersInGroupChange = async (gameId: number) => {
    try {
      const response = await fetchmembersInGroup(Number(gameId));
      if (Array.isArray(response)) {
        console.log("B ", response);
        setUsersPerGame((prevUsersPerGame) => ({
          ...prevUsersPerGame,
          [Number(gameId)]: response.length,
        }));
      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error("Error fetching members in group:", error);
    }
  };
  const fetchMembers = async (someGameId: number) => {
    const members = await handleMembersInGroupChange(someGameId);
    console.log("gameId" + someGameId);
    console.log("fetching members" + members);
  };
  useEffect(() => {
    fetchGamesWePlay()
      .then((response) => {
        if (Array.isArray(response)) {
          setData(response);
        } else {
          console.error("Unexpected data format:", response);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  async function getGames() {
    if (gameTypeId !== null) {
      setGameData([]); // Clear previous data or set to loading state.
      try {
        const response = await fetchGamesByTypeID(Number(gameTypeId));
        console.log("Data from API:", response);
        setGameData(response);
        setMaximumPlayers(response[0].maximumPlayers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  }

  useEffect(() => {
    getGames();
    console.log("get games", gameTypeId);
    // handleMembersInGroupChange(gameId);
  }, [gameTypeId]);

  const handleTabClick = (id: number) => {
    console.log("game type id", id);
    setGameTypeId(id);
  };
  const CustomTabPanel = (props: any) => {
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

  return (
    <>
      <InsufficientFunds
        open={isFundsOpen}
        onClose={handleCloseFunds}
        funds={balance}
        deposit={Number(deposit)}
      />
      <Typography variant="h4" component="div" gutterBottom>
        Games We Play
      </Typography>

      <Grid container spacing={3}>
        {data.map((game) => (
          <Grid item xs={12} md={6} lg={4} key={game.id}>
            <DepositDialog
              open={isDialogOpen}
              onClose={handleCloseDialog}
              deposit={deposit}
              setDeposit={setDeposit}
              handleJoinGame={handleJoinGame}
            />

            <Card>
              <CardMedia
                component="img"
                height="140"
                image="/path_to_placeholder_image.jpg"
                alt={game.name}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {game.name}
                  {game.id}
                </Typography>
                <Typography variant="body1" component="p">
                  Reward: {game.reward}
                </Typography>
                <Typography variant="body1" component="p">
                  count down: <CountDown drawDate={game.drawDate} />
                </Typography>
              </CardContent>
              <ButtonGroup
                variant="contained"
                color="primary"
                aria-label="join random group buttons"
              >
                <Button
                  onClick={() => {
                    handleOpenDialog();
                    setGameId(game.id);
                  }}
                >
                  play in random group
                </Button>

                <Button>play every week</Button>
              </ButtonGroup>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h4" component="div" gutterBottom>
        Ongoing Games
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="game tabs">
          {data.map((game, index) => (
            <Tab
              label={game.name}
              value={game.id}
              key={game.id}
              onClick={() => {
                handleTabClick(game.id);
                fetchMembers(game.id);
              }}
            />
          ))}
        </Tabs>
      </Box>
      {gameData.map((game) => (
        <CustomTabPanel value={value} index={game.gameTypes.id} key={game.id}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                {game?.gameTypes?.name} {game.id}
              </Typography>
              <Typography variant="body1" component="p">
                Reward: {game?.gameTypes.reward}
              </Typography>
              <Typography variant="body1" component="p">
                Members:{usersPerGame[game.id] || 0}/{game?.maximumPlayers}
              </Typography>
              <Typography variant="body1" component="p">
                Treasury: {game?.treasury}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  console.log("upg", usersPerGame);
                  console.log("firstGameId" + usersPerGame[game.id]);
                  if (
                    typeof usersPerGame[game.id] === "number" &&
                    game.maximumPlayers &&
                    Number(usersPerGame[game.id]) < Number(game.maximumPlayers)
                  ) {
                    console.log("firstGameId" + game.id);
                    handleOpenDialog();
                    setGameId(game.id);
                    console.log("gameId " + gameId);
                  } else {
                    console.error(
                      "Maximum players reached for this game.",
                      game
                    );
                    setGameTypeId(game.gameTypes.id);
                    handleCreateNewGame();
                    handleOpenDialog();

                    setGameId(game.id);
                    console.log(gameId);
                  }
                }}
              >
                Join
              </Button>
            </CardContent>
          </Card>
        </CustomTabPanel>
      ))}
    </>
  );
}

export { GameTypes };
