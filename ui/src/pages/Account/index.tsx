import {
  Button,
  TextField,
  Paper,
  Typography,
  AlertTitle,
  Alert,
  Container,
} from "@mui/material";
import { useEffect, useState } from "react";
import TokenUtils from "../../integrations/token";
import { updateBalance } from "../../services/depositAndWithdraw";
import fetchUserDetails from "../../services/users";

const AccountPage = () => {
  const jwt = TokenUtils.getJWT();
  const [balanceData, setBalanceData] = useState<number>(0);
  const [balance, setBalance] = useState<any>(jwt?.claims?.balance);
  const [userId, setUserId] = useState<any>(jwt?.claims?.userId);
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  function handleAmountChange(event: React.ChangeEvent<HTMLInputElement>) {
    setBalanceData(Number(event.target.value));
  }
  const userDetails = async () => {
    const response = await fetchUserDetails(userId);

    setUserData(response.data);
    setBalance(response.data.balance);
  };

  function depositFunds(balance: number) {
    updateBalance(balance).then(() => userDetails());
    setSuccess(true);
  }
  useEffect(() => {
    userDetails();
  }, [userId]);

  const withdrawFunds = (balanceData: number) => {
    if (Number(balanceData) <= balance) {
      const newBalance = balance - Number(balanceData);
      updateBalance(newBalance).then(() => userDetails());
      setBalance(newBalance);
      setSuccess(true);
    } else {
      setError(true);
    }
  };

  return (
    <div>
      <Paper
        elevation={3}
        style={{ padding: "20px", width: "300px", margin: "20px auto" }}
      >
        <Typography variant="h5">Balance :{userData?.balance} </Typography>
        <TextField
          label="Amount"
          variant="outlined"
          type="number"
          value={balanceData}
          onChange={handleAmountChange}
          fullWidth
          style={{ marginBottom: "20px" }}
          inputProps={{ min: "0" }}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => depositFunds(Number(userData.balance + balanceData))}
          >
            Deposit
          </Button>

          <Button
            variant="contained"
            color="secondary"
            onClick={() => withdrawFunds(Number(balanceData))}
          >
            Withdraw
          </Button>
        </div>{" "}
      </Paper>
      <Container maxWidth="sm">
        {success && (
          <Alert
            severity="success"
            action={
              <Button
                color="inherit"
                size="small"
                onClick={() => {
                  setSuccess(false);
                }}
              >
                Close
              </Button>
            }
          >
            <AlertTitle>Success</AlertTitle>
            Transaction successful - new Balance {userData.balance}
          </Alert>
        )}
        {error && (
          <Alert
            severity="error"
            action={
              <Button
                color="inherit"
                size="small"
                onClick={() => setError(false)}
              >
                Close
              </Button>
            }
          >
            <AlertTitle>Error</AlertTitle>
            Insufficient funds — <strong>please try again.</strong>
          </Alert>
        )}
      </Container>
    </div>
  );
};

export default AccountPage;
