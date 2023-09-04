/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { PieChart } from "@mui/x-charts/PieChart";
import Typography from "@mui/material/Typography";
import Members from "./membersList";
import { StyledPaperTop } from "../styles/styled";
import { color } from "@mui/system";
import {
  updateBalance,
  updateTreasury,
} from "../../../services/depositAndWithdraw";
import { useEffect, useState } from "react";
import { Alert, Input, Snackbar } from "@mui/material";
import TokenUtils from "../../../integrations/token";
import fetchUserDetails from "../../../services/users";
import { useParams } from "react-router-dom";
import { fetchUserGamesByUserGameId } from "../../../services/userGames";

const buttonToAnchorMap = {
  members: "right",
  stats: "left",
} as const;

function PercentagesDrawer({ userData }) {
  const [state, setState] = useState<Record<string, boolean>>({
    stats: false,
    members: false,
  });
  const { userGameId } = useParams<{ userGameId: string }>();

  const [userGameData, setUserGameData] = useState<any>();
  const [deposit, setDeposit] = useState<number>();
  const [userDepositData, setUserDepositData] = useState<any>();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  useEffect(() => {
    fetchUserGamesByUserGameId(Number(userGameId)).then((response) => {
      console.log("USER GAME RESPONSE", response);
      setUserGameData(response);
    });
  }, [userGameId]);
  console.log("USER GAME DATA", userGameData);

  console.log("------USERGAMEDATA", userGameData);

  // Calculate deposit percentages
  const calculatePercentages = () => {
    console.log("MAPPED USER DATA FOR SPLITTING BILL", userData);
    let totalTreasury = 0;
    for (let i = 0; i < userData.length; i++) {
      totalTreasury += userData[i].deposit;
      console.log(userData[i]);
    }
    console.log("TOTAL TREASURY", totalTreasury);
    return userData.map((user, index) => {
      const depositPercentage = //@ts-ignore
        (Number(user?.deposit) / Number(totalTreasury)) * 100;
      const name = user?.users?.firstName && user?.users?.lastName;
      return {
        id: index,
        value: depositPercentage,
        label: `${name} (${depositPercentage.toFixed(2)}%)`,
      };
    });
  };
  console.log("CALCULATED PERCENTAGES", calculatePercentages());
  const toggleDrawer =
    (buttonName: string, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [buttonName]: open });
    };
  const handleDeposit = async (deposit: number) => {
    const userBalance = Number(userDepositData.balance);
    const finalDeposit = userBalance - deposit;
    updateBalance(Number(finalDeposit));
    const updateDeposit = deposit + userGameData.deposit;
    updateDeposit(Number(updateDeposit)).then(() => {
      setSnackbarOpen(true);
    });
  };
  const list = (buttonName: string) => {
    const calculatedPercentages = calculatePercentages();
    return (
      <Box
        sx={{ width: 550, backgroundColor: "darkgray", color: "white" }}
        role="presentation"
        onClick={toggleDrawer(buttonName, false)}
        onKeyDown={toggleDrawer(buttonName, false)}
      >
        {buttonName === "stats" && (
          <>
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={3000}
              onClose={() => setSnackbarOpen(false)}
            >
              <Alert onClose={() => setSnackbarOpen(false)} severity="success">
                Deposit updated successfully!
              </Alert>
            </Snackbar>
            <StyledPaperTop>
              <Typography
                variant="h6"
                component="div"
                sx={{ padding: "16px", color: "white" }}
              >
                Contributions
              </Typography>
            </StyledPaperTop>
            <Button
              sx={{ color: "darkRed" }}
              onClick={toggleDrawer(buttonName, false)}
            >
              Go Back
            </Button>
            <PieChart
              series={[
                {
                  data: calculatedPercentages,
                },
              ]}
              width={400}
              height={200}
              sx={{
                zIndex: 1002,
                color: "white",
              }}
            />

            <Input
              type="number"
              value={deposit}
              onChange={(event) => setDeposit(parseFloat(event.target.value))}
              sx={{ width: "100px", mr: 1, backgroundColor: "white" }}
              onClick={(event) => event.stopPropagation()}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={(event) => {
                event.stopPropagation();
                handleDeposit(Number(deposit));
              }}
            >
              Deposit
            </Button>
            <Box sx={{ marginTop: "16px", color: "white" }}>
              <Typography variant="h6">User Details:</Typography>
              {calculatedPercentages.map((user, index) => (
                <Typography key={index}>{user.label}</Typography>
              ))}
            </Box>
          </>
        )}
        {buttonName === "members" && (
          <>
            <Members />
            <Button
              sx={{ color: "red" }}
              onClick={toggleDrawer(buttonName, false)}
            >
              Go Back
            </Button>
          </>
        )}
      </Box>
    );
  };

  return (
    <Box>
      {Object.keys(buttonToAnchorMap).map((buttonName) => (
        <React.Fragment key={buttonName}>
          <Button
            sx={{ color: "white" }}
            onClick={toggleDrawer(buttonName, true)}
          >
            {buttonName}
          </Button>
          <Drawer
            anchor={
              buttonToAnchorMap[buttonName as keyof typeof buttonToAnchorMap]
            }
            open={state[buttonName]}
            onClose={toggleDrawer(buttonName, false)}
            sx={{ backgroundColor: "grey" }}
          >
            {list(buttonName)}
          </Drawer>
        </React.Fragment>
      ))}
    </Box>
  );
}

export default PercentagesDrawer;
