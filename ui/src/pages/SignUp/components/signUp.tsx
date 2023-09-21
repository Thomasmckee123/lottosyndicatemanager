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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
const Register = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const { dispatch } = AuthContext.useLogin();
  const [emailExists, setEmailExists] = useState(false); // State to track if email exists
  const [userType, setUserType] = useState("");

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };
  const handleUserTypeChange = (event: SelectChangeEvent<string>) => {
    setUserType(event.target.value);
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

    const response = await signUpUser(
      firstName,
      lastName,
      email,
      password,
      Number(userType)
    );
    if (response != 400) {
      setOpenSuccessSnackbar(true);

      
    } else {
      setOpenErrorSnackbar(true);
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
          <FormControl fullWidth margin="normal">
            <InputLabel id="user-type-label">User Type</InputLabel>
            <Select
              labelId="user-type-label"
              id="user-type"
              value={userType}
              onChange={handleUserTypeChange}
            >
              <MenuItem value={1}>Player</MenuItem>
              <MenuItem value={2}>Syndicate manager</MenuItem>
            </Select>
          </FormControl>
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
            label="Password, minimum 8 characters, 1 number"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />

          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ backgroundColor: "darkred" }}
            onClick={handleRegister}
          >
            Sign up
          </Button>
          <Link to={NavigationRoutes.LOGIN}>Sign In </Link>
        </form>
        <Snackbar
          open={openSuccessSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSuccessSnackbar(false)}
          message="Successfully registered, please press the signup button to sign up"
        />
        <Snackbar
          open={openErrorSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenErrorSnackbar(false)}
          message={
            "Error registering, make sure you have a valid email, your password is 8 charachters long, with a number and a special character"
          }
        />
      </Container>
    </Container>
  );
};

export default Register;
