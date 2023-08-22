import { Button, TextField, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import TokenUtils from "../../integrations/token";
import { updateBalance } from "../../services/depositAndWithdraw";

const AccountPage = () => {
  const jwt = TokenUtils.getJWT();
  const [balanceData, setBalanceData] = useState<number>(0);
  const [balance, setBalance] = useState<any>(jwt?.claims?.balance);

  function handleAmountChange(event: React.ChangeEvent<HTMLInputElement>) {
    setBalanceData(Number(event.target.value));
  }

  function depositFunds() {
    updateBalance(balanceData);
  }
  useEffect(() => {
    console.log("balance", balanceData);
  }, [balanceData]);

  async function withdrawFunds() {
    if (Number(balanceData) <= balance) {
      const newBalance = balance - Number(balanceData);
      await updateBalance(newBalance);
      setBalance(newBalance);
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
        <Button
          variant="contained"
          color="primary"
          onClick={() => depositFunds()}
        >
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
