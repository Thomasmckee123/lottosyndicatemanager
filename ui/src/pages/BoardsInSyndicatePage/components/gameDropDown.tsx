import { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { fetchGameById, fetchGamesByTypeID } from "../../../services/games";
import CountDown from "../../../components/countdown";
import { Link, useParams } from "react-router-dom";
import { NavigationRoutes } from "../../../constants";
import DepositDialog from "./deposit";
import { joinGame } from "../../../services/joiningGames";
import {
  updateBalance,
  updateTreasury,
} from "../../../services/depositAndWithdraw";
import fetchUserDetails from "../../../services/users";
import InsufficientFunds from "./insufficientFunds";
import {
  fetchUserGames,
  fetchUserGamesByGameId,
} from "../../../services/userGames";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

interface TopDrawerProps {
  title: string;
  gameTypeId: number;
  userId: number;
  syndicateId: number;
  roleId: number;
  userSyndicateId: number;
}

export default function GameDropDown({
  title,
  gameTypeId,
  syndicateId,
  roleId,
  userSyndicateId,
  userId,
}: TopDrawerProps) {
  console.log("ROLEID", roleId);
  console.log("GAMETYPEID FOR DROP DOWN", gameTypeId);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isticketInput, setisTicketInput] = useState<boolean>(false);
  const [gameData, setGameData] = useState<any[]>([]);
  const [balanceData, setBalanceData] = useState<any>();
  const [deposit, setDeposit] = useState<number>();
  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };
  const [open, setOpen] = useState<boolean>(false);
  const [funds, setFunds] = useState<number>(0);
  const [userGameId, setUserGameId] = useState<number>();
  const [userGameData, setUserGameData] = useState<any[]>([]);
  const [gameDataId, setGameDataID] = useState<number>();
  const [verified, setVerified] = useState<boolean>(true);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getNormalGames = async () => {
    console.log(
      "getNormalGames called with gameTypeId:",
      gameTypeId,
      "and syndicateId:",
      syndicateId
    );
    await fetchGamesByTypeID(gameTypeId, syndicateId).then((response) => {
      const filteredResponse = response.filter(
        (game) => game.maximumPlayers > 20
      ); // <-- added closing parenthesis here
      setData(filteredResponse);
      setGameDataID(filteredResponse[0]?.id);
    });
  };

  useEffect(() => {
    fetchUserDetails(String(userId)).then((response) => {
      setBalanceData(response.data);
    });
  }, []);
  const balance = balanceData?.balance!;

  async function getGames() {
    if (gameTypeId) {
      setGameData([]);
      try {
        const response = await fetchGamesByTypeID(
          gameTypeId,
          Number(syndicateId)
        );
        setGameData(response);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    }
  }

  console.log("OUTSIDEGAMEDATAID", gameDataId);
  useEffect(() => {
    fetchUserGames(Number(userId)).then((response) => {
      console.log("RESPONSE....aaaaasssss", response);
      setUserGameData(response);
      console.log("GAMEDATAID", gameDataId);
      for (let i = 0; i < response.length; i++) {
        if (response[i].games.id == gameDataId) {
          setUserGameId(response[i].id);
        }
      }
    });
  }, [gameDataId]);

  const getCurrentTreasury = async (gameId: number) => {
    const game = await fetchGameById(gameId);
    return game.treasury;
  };
  const handleJoinGame = async () => {
    const allGamesForType = await fetchUserGamesByGameId(Number(data[0]?.id));
    let alreadyThere = false;
    console.log("checking members", allGamesForType);
    for (let i = 0; i < allGamesForType.length; i++) {
      if (allGamesForType[i].users.id == userId) {
        alreadyThere = true;
      }
      // Do something with the game object
    }

    const currentTreasury = await getCurrentTreasury(Number(data[0].id));
    const newTreasury = currentTreasury + Number(deposit);
    const newBalance = Number(balance!) - Number(newTreasury);

    if (newBalance > 0) {
      let response;
      if (!alreadyThere) {
        response = await joinGame(
          new Date(),
          Number(deposit),
          Number(data[0].id),
          Number(userId)
        );
      }
      await updateBalance(newBalance!);
      await updateTreasury(newTreasury, Number(data[0].id));
      await getGames();
      return response;
    } else {
      handleOpen();
    }
  };

  const handleTicketInput = () => {
    setisTicketInput(true);
  };
  const handleTicketClose = () => {
    setisTicketInput(false);
  };
  const [depositOpen, setDepositOpen] = useState(false);
  const [depositAmount, setDepositAmount] = useState<number | null>(null);

  const handleDepositOpen = () => {
    setDepositOpen(true);
  };

  const handleDepositClose = () => {
    setDepositOpen(false);
  };

  const handleDepositConfirm = () => {
    handleJoinGame();
    setDepositOpen(false);
  };
  const [data, setData] = useState<any[]>([]);
  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  useEffect(() => {
    console.log("CALLING FUNCTION");
    getNormalGames();
  }, [gameTypeId]);
  console.log("DATA", data);
  useEffect(() => {
    console.log("ROLEID", roleId);
    if (Number(roleId) === 2) {
      setVerified(false);
    }
  }, [roleId]);
  return (
    <>
      {/* Render your dropdown component here */}
      <DepositDialog
        open={depositOpen}
        onClose={handleDepositClose}
        deposit={deposit}
        setDeposit={setDeposit}
        handleJoinGame={handleDepositConfirm}
      />
      <InsufficientFunds
        open={open}
        onClose={handleClose}
        funds={funds}
        deposit={deposit}
      />
      <AppBar position="static" sx={{ backgroundColor: "grey" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerOpen}
          >
            <PlayArrowIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <>
        <Drawer anchor="top" open={isDrawerOpen} onClose={handleDrawerClose}>
          {data?.length > 0 ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "grey",
                  padding: "1rem",
                }}
              >
                <Link
                  to={NavigationRoutes.SYNDICATEGAMEMESSAGE.replace(
                    ":userSyndicateId",
                    `${userSyndicateId}`
                  )
                    .replace(":syndicateId", `${syndicateId}`)
                    .replace(":gameId", `${data[0]?.id}`)
                    .replace(":userGameId", `${userGameId}`)}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ marginRight: "1rem", backgroundColor: "darkred" }}
                  >
                    View Deposit Percentages
                  </Button>
                </Link>
                <Link
                  to={NavigationRoutes.VIEWTICKETSPAGE.replace(
                    ":syndicateId",
                    `${syndicateId}`
                  )
                    .replace(":userSyndicateId", `${userSyndicateId}`)
                    .replace(":gameId", `${data[0]?.id}`)}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ marginRight: "1rem", backgroundColor: "darkred" }}
                  >
                    View Ticket Numbers
                  </Button>
                </Link>
                <Link
                  to={NavigationRoutes.TICKETINPUT.replace(
                    ":syndicateId",
                    `${syndicateId}`
                  )
                    .replace(":userSyndicateId", `${userSyndicateId}`)
                    .replace(":gameId", `${data[0]?.id}`)
                    .replace(":roleId", `${roleId}`)}
                  onClick={(e) => {
                    if (verified) {
                      e.preventDefault();
                    }
                  }}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    disabled={!verified}
                    sx={{ marginRight: "1rem", backgroundColor: "darkred" }}
                  >
                    Input Tickets
                  </Button>
                </Link>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ backgroundColor: "darkred" }}
                  onClick={handleDepositOpen}
                >
                  Deposit More Money
                </Button>
              </Box>
              <List>
                {data?.map(
                  (game) =>
                    game.maximumPlayers >= 20 && (
                      <>
                        <ListItem key={game?.id}>
                          <ListItemIcon sx={{ width: "70%", height: "70%" }}>
                            <img
                              src={game?.gameTypes?.image}
                              alt={game?.name}
                              width={70}
                              height={70}
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={game?.gameTypes?.name}
                            secondary={`Treasury: ${game?.treasury} `}
                          />
                        </ListItem>
                        <CountDown
                          gameId={game.gameTypes.id}
                          drawDate={game.gameTypes.drawDate}
                        />
                      </>
                    )
                )}
              </List>
            </>
          ) : (
            <Typography variant="body1">No games yet</Typography>
          )}
        </Drawer>
      </>
    </>
  );
}
