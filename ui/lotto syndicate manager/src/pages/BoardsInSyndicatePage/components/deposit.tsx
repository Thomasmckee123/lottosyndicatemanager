import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

interface DepositDialogProps {
  open: boolean;
  onClose: () => void;
  deposit: number | null;
  setDeposit: (value: number | null) => void;
  handleJoinGame: () => void;
}

const DepositDialog: React.FC<DepositDialogProps> = ({
  open,
  onClose,
  deposit,
  setDeposit,
  handleJoinGame,
}) => (
  <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
    <DialogTitle id="form-dialog-title">Deposit</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Please enter the amount you'd like to deposit:
      </DialogContentText>
      <TextField
        margin="dense"
        id="name"
        label="Deposit Amount"
        type="number"
        value={deposit || ""}
        onChange={(e) => setDeposit(Number(e.target.value))}
        fullWidth
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Cancel
      </Button>
      <Button
        onClick={() => {
          onClose();
          handleJoinGame();
        }}
        color="primary"
      >
        Confirm
      </Button>
    </DialogActions>
  </Dialog>
);
export default DepositDialog;
