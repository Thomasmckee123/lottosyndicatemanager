/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../../contexts";
import { NavigationRoutes } from "../../../constants";
import { signUpUser } from "../../../services/signUp";
import {
  Container,
  Typography,
  TextField,
  Button,
  Snackbar,
} from "@mui/material";

const Register = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const { dispatch } = AuthContext.useLogin();
  const [emailExists, setEmailExists] = useState(false); // State to track if email exists

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handleFirstNameChange = (event: any) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event: any) => {
    setLastName(event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };
  const navigate = useNavigate();

  const handleRegister = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      await signUpUser(firstName, lastName, email, password);

      setOpenSuccessSnackbar(true);

      navigate(NavigationRoutes.LOGIN);
    } catch (error) {
      setOpenErrorSnackbar(true);
      window.location.reload();
    }
  };
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Register Page
      </Typography>
      <Container maxWidth="xs">
        <Typography variant="h5" align="center" gutterBottom>
          Lottery syndicate manager
        </Typography>
        <form>
          <TextField
            fullWidth
            margin="normal"
            label="Email Address"
            value={email}
            onChange={handleEmailChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="First Name"
            value={firstName}
            onChange={handleFirstNameChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Last Name"
            value={lastName}
            onChange={handleLastNameChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password, minimum 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />

          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleRegister}
          >
            Sign up
          </Button>
          <Link to={NavigationRoutes.LOGIN}>log on </Link>
        </form>
        <Snackbar
          open={openSuccessSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSuccessSnackbar(false)}
          message="Successfully registered"
        />
        <Snackbar
          open={openErrorSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenErrorSnackbar(false)}
          message="Error registering"
        />
      </Container>
    </Container>
  );
};

export default Register;
