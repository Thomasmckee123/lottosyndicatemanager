import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { NavigationRoutes } from "../../../constants";

interface DepositDialogProps {
  open: boolean;
  onClose: () => void;
  funds: number;
  deposit: number;
}

const InsufficientFunds: React.FC<DepositDialogProps> = ({
  open,
  onClose,
  funds,
  deposit,
}) => {
  const navigate = useNavigate();

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Deposit</DialogTitle>
      <DialogContent>
        <DialogContentText>you have insufficient funds</DialogContentText>
        <Typography>
          your current balance is:{funds}
          you attempted to deposit: {deposit}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            navigate(NavigationRoutes.ACCOUNT);
          }}
          color="primary"
        >
          top up
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InsufficientFunds;
