/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link, Link, useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

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

  const handleRegister = async () => {
    try {
      const response = await signUpUser(firstName, lastName, email, password);

      const authDetails = {
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      };
      localStorage.setItem("user", JSON.stringify(authDetails));

      dispatch({
        type: "authentication",
        ...authDetails,
      });

      setOpenSuccessSnackbar(true); // Open success snackbar
    } catch (error) {
      setOpenErrorSnackbar(true); // Open error snackbar
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSuccessSnackbar(false);
    setOpenErrorSnackbar(false);
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
            label="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <Link to={NavigationRoutes.LOGIN}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleRegister}
            >
              Sign up
            </Button>
          </Link>
        </form>
      </Container>
      <Snackbar
        open={openSuccessSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Registration successful!"
      />
      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Registration failed. Please try again."
      />
    </Container>
  );
};

export default Register;
