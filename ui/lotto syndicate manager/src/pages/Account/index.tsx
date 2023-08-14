import { Button, TextField, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import TokenUtils from "../../integrations/token";
import { updateBalance } from "../../services/depositAndWithdraw";

const AccountPage = () => {
  const [data, setData] = useState<any>();
  const [balanceData, setBalanceData] = useState<any>("");

  useEffect(() => {
    const jwt = TokenUtils.getJWT();
    setData(jwt);
  }, []);

  const balance = data?.claims?.balance;
  const userId = data?.claims?.userId;

  function handleAmountChange(event: React.ChangeEvent<HTMLInputElement>) {
    setBalanceData(event.target.value);
  }

  function depositFunds() {
    updateBalance(userId, Number(balanceData) + balance);
  }

  function withdrawFunds() {
    if (Number(balanceData) <= balance) {
      updateBalance(balance - Number(balanceData), userId);
    } else {
      alert("Insufficient funds.");
    }
  }

  return (
    <Paper
      elevation={3}
      style={{ padding: "20px", width: "300px", margin: "20px auto" }}
    >
      <Typography variant="h5">Balance :{balance} </Typography>

      <TextField
        label="Amount"
        variant="outlined"
        type="number"
        value={balanceData}
        onChange={handleAmountChange}
        fullWidth
        style={{ marginBottom: "20px" }}
      />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="contained" color="primary" onClick={depositFunds}>
          Deposit
        </Button>

        <Button variant="contained" color="secondary" onClick={withdrawFunds}>
          Withdraw
        </Button>
      </div>
    </Paper>
  );
};

export default AccountPage;
