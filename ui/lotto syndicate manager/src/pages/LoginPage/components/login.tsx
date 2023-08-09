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
import { useFormik } from "formik";

import { AuthContext } from "../../../contexts";
import { NavigationRoutes } from "../../../constants";
import AuthService from "../../../services/auth";

const LogonPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = AuthContext.useLogin();

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const navigate = useNavigate();

  const Login = async (email_address: string, password: string) => {
    const response = await AuthService.authenticate(email_address, password);
    if (response.status === 200) {
      const authDetails = {
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      };

      localStorage.setItem("user", JSON.stringify(authDetails));
      localStorage.setItem("userEmail", JSON.stringify(email_address));

      dispatch({
        type: "authentication",
        ...authDetails,
      });
      navigate(NavigationRoutes.HOME);
    }
    return response.data;
  };

  const handleLogin = (event: any) => {
    event?.preventDefault();
    try {
      console.log(email + " " + password);
      Login(email, password);
    } catch (err) {
      console.log(err);
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
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
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
      </Box>
    </Container>
  );
};

export default LogonPage;
