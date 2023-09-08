/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { AuthContext } from "../../../contexts";
import { NavigationRoutes } from "../../../constants";
import AuthService from "../../../services/auth";
import useTokens from "../../../hooks/useTokens";
import { Alert, Snackbar } from "@mui/material";

const LogonPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  const { dispatch } = AuthContext.useLogin();
  const { checkIfValidToken } = useTokens();
  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const navigate = useNavigate();

  const Login = async (emailAddress: string, password: string) => {
    const response = await AuthService.authenticate(emailAddress, password);
    if (response.status === 200) {
      checkIfValidToken(response.data);
    } else {
      setOpenErrorSnackbar(true);
    }
    return response.data;
  };

  const handleLogin = async (event: any) => {
    event?.preventDefault();
    try {
      await Login(email, password);
    } catch (err) {
      console.log(err);
      setOpenErrorSnackbar(true);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Toaster />
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleLogin}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            value={email}
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleEmailChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            data-testid="password-login"
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
            id="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: "darkred" }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link
                onClick={() => {
                  navigate(NavigationRoutes.SIGNUP);
                }}
              >
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
        <Snackbar
          open={openErrorSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenErrorSnackbar(false)}
        >
          <Alert severity="error">
            Invalid email or password. Please try again.
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default LogonPage;
