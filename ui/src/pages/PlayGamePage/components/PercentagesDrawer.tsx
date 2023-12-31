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
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchUserGamesByUserGameId,
  updateDeposit,
} from "../../../services/userGames";

const buttonToAnchorMap = {
  members: "right",
  stats: "left",
} as const;

function PercentagesDrawer({ userData, fetchUserData }) {
  const [state, setState] = useState<Record<string, boolean>>({
    stats: false,
    members: false,
  });
  const navigate = useNavigate();
  const { userGameId, gameId } = useParams<{
    userGameId: string;
    gameId: string;
  }>();
  const [userGameData, setUserGameData] = useState<any>();
  const [deposit, setDeposit] = useState<number>();
  const [userDepositData, setUserDepositData] = useState<any>();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const jwt = TokenUtils.getJWT();
  const userId = jwt.claims.userId;
  useEffect(() => {
    fetchUserDetails(userId).then((response) => {
      setUserDepositData(response);
    });
  }, []);

  useEffect(() => {
    fetchUserGamesByUserGameId(Number(userGameId)).then((response) => {
      setUserGameData(response);
    });
  }, [userGameId]);

  // Calculate deposit percentages
  const calculatePercentages = () => {
    let totalTreasury = 0;
    for (let i = 0; i < userData.length; i++) {
      totalTreasury += userData[i].deposit;
    }
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
  const toggleDrawer =
    (buttonName: string, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      setState({ ...state, [buttonName]: open });
    };
  const handleDeposit = async (deposit: number) => {
    const userBalance = Number(userDepositData?.data?.balance);

    const finalBalance = userBalance - deposit;
    updateBalance(Number(finalBalance));

    const updatedDeposit = deposit + Number(userGameData[0].deposit);

    updateDeposit(Number(updatedDeposit), userGameData[0].id).then(() => {
      setSnackbarOpen(true);
    });
    let treasury = Number(userGameData[0].games?.treasury) + deposit;
    updateTreasury(treasury, Number(gameId)).then(() => {
      fetchUserData();
    });
  };
  const list = (buttonName: string) => {
    const calculatedPercentages = calculatePercentages();
    return (
      <Box
        sx={{
          width: 550,
          backgroundColor: "darkgray",
          color: "white",
          height: "100%",
        }}
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
              <Typography variant="h6" component="div" sx={{ color: "white" }}>
                Contributions
              </Typography>
            </StyledPaperTop>
            <Button sx={{ color: "darkRed" }} onClick={() => navigate(0)}>
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
              colors={["darkRed", "grey", "darkblue", "yellow", "white"]}
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
              sx={{ backgroundColor: "darkred" }}
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
