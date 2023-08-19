import * as React from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  Select,
  MenuItem,
  DialogActions,
} from "@mui/material";
import { useEffect, useState } from "react";
import { createTicket, getTicketsByGameId } from "../../../services/tickets";
import { useParams } from "react-router-dom";
import { fetchGameById } from "../../../services/games";
import RegularNumbers from "./numbers";
import SelectedNumbers from "./balls";
import TokenUtils from "../../../integrations/token";
import {
  updateBalance,
  updateTreasury,
} from "../../../services/depositAndWithdraw";
import { GameTypes } from "../../BoardsInSyndicatePage/components/gameTypesPage";

function TicketInput() {
  const [open, setOpen] = useState(false);
  const [selectedNumbers, setSelectedNumbers] = useState<number[][]>([]);
  const { gameId } = useParams<{ gameId: string }>();
  const [data, setData] = useState<any>();
  const [numberOfDropdowns, setNumberOfDropDowns] = useState<number>();
  const [numberOfBalls, setNumberOfBalls] = useState<number>();
  const [selectedBalls, setSelectedBalls] = useState<number[]>([]);
  const [numberOptions, setNumberOptions] = useState<number>();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [ticketCode, setTicketCode] = useState<string>();
  const [openPopup, setOpenPopup] = useState(false);

  const toggleBallSelection = (ball: number) => {
    if (selectedBalls.includes(ball)) {
      setSelectedBalls((prev) => prev.filter((b) => b !== ball));
    } else {
      setSelectedBalls((prev) => [...prev, ball]);
    }
  };
  const jwt = TokenUtils.getJWT();
  const userId = jwt.claims.userId;

  const handleupdateUserBalance = () => {
    console.log("UPDATING USER BALANCE USER ID", userId);
    console.log("UPDATING TREASURY BALANCE", gameId);
    console.log("ticket cost", data?.gameTypes.ticketCost);

    let takeAwayTicketCost = data?.treasury - data?.gameTypes?.ticketCost;
    let addTicketCost = jwt.claims.balance + data?.gameTypes?.ticketCost;

    updateBalance(Number(userId), Number(addTicketCost)).then(() => {
      updateTreasury(Number(takeAwayTicketCost), Number(gameId));
    });
  };

  const handleNumberChange = (ballIndex: number, dropdownIndex: number, e) => {
    const newValue = e.target.value; // Assuming e.target.value contains the selected number.

    // Check if we already have a numbers array for the current ball. If not, create one filled with default values.
    let currentBallNumbers = selectedNumbers[ballIndex]
      ? [...selectedNumbers[ballIndex]]
      : Array(numberOfDropdowns).fill("");

    // Update the number for the specific dropdown within the current ball's numbers.
    currentBallNumbers[dropdownIndex] = newValue;

    // Update the numbers array for the current ball in our main selectedNumbers array.
    const newSelectedNumbers = [...selectedNumbers];
    newSelectedNumbers[ballIndex] = currentBallNumbers;

    // Update the state with our new numbers.
    setSelectedNumbers(newSelectedNumbers);
  };

  const handleNormalNumberChange = (
    index: number,
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const newNumbers = [...selectedNumbers];
    newNumbers[index] = event.target.value as number[];
    setSelectedNumbers(newNumbers);
  };

  useEffect(() => {
    fetchGameById(Number(gameId)).then((response) => {
      setData(response);
      console.log("set Game Id", response.gameTypes.id);
    });
  }, [gameId]);

  const handleInputTicket = () => {
    const dropdownsMap: Record<number, number> = {
      1: 5,
      2: 6,
      3: 5,
      4: 3,
      5: 5,
      6: 6,
    };

    setNumberOfDropDowns(dropdownsMap[Number(data.gameTypes.id)]);
    switch (data.gameTypes.id) {
      case 1:
        setNumberOptions(50);
        break;
      case 2:
        setNumberOptions(47);
        break;
      case 3:
        setNumberOptions(39);
        break;
      case 4:
        setNumberOptions(59);
        break;
      case 5:
        setNumberOptions(50);
        break;
      case 6:
        setNumberOptions(59);
        break;
    }

    if (Number(data.gameTypes.id) == 4) {
      setNumberOfBalls(5);
    } else if (Number(data.gameTypes.id == 5)) {
      setNumberOfBalls(6);
    } else {
      setNumberOfBalls(0);
    }
  };
  const WaitingPopup = () => {
    return (
      <Dialog open={openPopup} onClose={() => setOpenPopup(false)}>
        <DialogTitle>Attention Required</DialogTitle>
        <DialogContent>
          <Typography>
            Please wait for more people to join, or deposit more money to buy a
            ticket.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPopup(false)} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const handleConfirm = () => {
    // Flatten the 2D array to a 1D array
    const flattenedNumbers = selectedNumbers.flat();

    // Filter out any undefined or empty values
    const validNumbers = flattenedNumbers.filter(Boolean);

    // Convert the numbers to a string format, concatenated by dashes
    const ticketCodeString = validNumbers.join("-");

    setTicketCode(ticketCodeString);

    console.log("Ticket Code:", ticketCodeString);

    // Call the function to send the ticket code
    handleNumberInputs(ticketCodeString).then(() => handleupdateUserBalance());

    handleClose();
  };

  const handleNumberInputs = async (ticketCode: any) => {
    if (data?.treasury >= data?.gameTypes?.ticketCost) {
      createTicket(ticketCode, Number(gameId));
    } else {
      setOpenPopup(true);
    }
  };

  const dialogBox = () => {
    const [activeBallIndex, setActiveBallIndex] = useState(null);

    const handleBallPress = (index) => {
      toggleBallSelection(index + 1);
      setActiveBallIndex(index);
    };

    if (numberOfDropdowns != undefined) {
      if (Number(numberOfBalls) == 0) {
        return (
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Select Your Numbers</DialogTitle>
            <DialogContent>
              {Array.from({ length: numberOfDropdowns }).map((_, index) => (
                <Select
                  key={index}
                  value={selectedNumbers[index] || ""}
                  onChange={(e) => handleNormalNumberChange(index, e)}
                  sx={{ mr: 2, mb: 2 }}
                >
                  {Array.from({ length: 100 }).map((_, num) => (
                    <MenuItem key={num} value={num + 1}>
                      {num + 1}
                    </MenuItem>
                  ))}
                </Select>
              ))}
            </DialogContent>
            <Button color="primary" onClick={handleConfirm}>
              Confirm
            </Button>
          </Dialog>
        );
      } else {
        return (
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Select Your Balls</DialogTitle>
            <DialogContent>
              {Array.from({ length: numberOfBalls }).map((_, ballIndex) => (
                <div key={ballIndex}>
                  <Button
                    variant={
                      selectedBalls.includes(ballIndex + 1)
                        ? "contained"
                        : "outlined"
                    }
                    color="primary"
                    onClick={() => handleBallPress(ballIndex)}
                    sx={{ margin: "5px" }}
                  >
                    {ballIndex + 1}
                  </Button>

                  {activeBallIndex === ballIndex &&
                    Array.from({ length: numberOfDropdowns }).map(
                      (_, dropdownIndex) => (
                        <Select
                          key={dropdownIndex}
                          value={
                            (selectedNumbers[ballIndex] || [])[dropdownIndex] ||
                            ""
                          }
                          onChange={(e) =>
                            handleNumberChange(ballIndex, dropdownIndex, e)
                          }
                          sx={{ mr: 2, mb: 2 }}
                        >
                          {Array.from({ length: numberOptions }).map(
                            (_, num) => (
                              <MenuItem key={num} value={num + 1}>
                                {num + 1}
                              </MenuItem>
                            )
                          )}
                        </Select>
                      )
                    )}
                </div>
              ))}
            </DialogContent>
            <Button
              color="primary"
              onClick={() => {
                handleConfirm();

                console.log(data?.treasury);
                handleNumberInputs(ticketCode?.toString());
              }}
            >
              Confirm
            </Button>
          </Dialog>
        );
      }
    }
  };
  return (
    <Box sx={{ pb: 7, mt: 3 }}>
      <Card sx={{ my: 3, mx: "auto", maxWidth: 800 }}>
        <CardContent>
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="body1" color="text.secondary">
              Treasury:{data?.treasury}
            </Typography>
            <Typography variant="h5" color="text.primary"></Typography>
          </Box>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Enter Your Ticket Numbers
          </Typography>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={8}>
              <Button
                variant="outlined"
                onClick={() => {
                  handleOpen();
                  handleInputTicket();
                }}
              >
                Select Numbers
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="primary"
                sx={{ height: "100%", width: "100%" }}
                onClick={handleConfirm}
              >
                Confirm Numbers
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {dialogBox()}

      {data?.gameTypes?.id !== 4 && data?.gameTypes?.id !== 5 ? (
        <RegularNumbers gameId={gameId} />
      ) : (
        <SelectedNumbers gameId={gameId} />
      )}
      {WaitingPopup()}
    </Box>
  );
}

export default TicketInput;
