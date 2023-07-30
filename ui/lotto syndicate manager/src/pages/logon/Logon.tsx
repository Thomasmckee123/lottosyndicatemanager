// import React from "react";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import Link from "@mui/material/Link";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import useTokens from "../../hooks/useTokens";
// import { useNavigate } from "react-router-dom";
// import { StatusCodes } from "http-status-codes";
// import { Toaster, toast } from "react-hot-toast";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import useAuth from "../../hooks/useAuth";

// const Login = () => {
//   const { mutate } = useAuth();
//   const { checkIfValidToken } = useTokens();
//   const navigate = useNavigate();
//   const handleSubmit = async (values: any) => {
//     mutate(values, {
//       onSuccess: (response) => {
//         if (response.status === StatusCodes.OK) {
//           toast.success("Login Successful");
//           checkIfValidToken(response.data);
//         }
//       },
//       onError: () => {
//         toast.error("Login Failed. Please check your credentials");
//         throw new Error();
//       },
//     });
//   };
//   const validationSchema = Yup.object().shape({
//     email: Yup.string().email("Invalid email").required("Required"),
//     password: Yup.string().required("Required"),
//   });
//   const initialValues = { email: "", password: "" };
//   const formik = useFormik({
//     initialValues: initialValues,
//     onSubmit: (values) => {
//       handleSubmit(values);
//     },
//     validationSchema: validationSchema,
//     enableReinitialize: true,
//   });
//   return (
//     <Container component="main" maxWidth="xs">
//       <CssBaseline />
//       <Box
//         sx={{
//           marginTop: 8,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//         }}
//       >
//         <Toaster />
//         <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
//           <LockOutlinedIcon />
//         </Avatar>
//         <Typography component="h1" variant="h5">
//           Sign in
//         </Typography>
//         <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             id="email"
//             label="Email Address"
//             value={formik.values.email}
//             name="email"
//             autoComplete="email"
//             autoFocus
//             onChange={formik.handleChange}
//             error={formik.touched.email && Boolean(formik.errors.email)}
//             helperText={formik.touched.email && formik.errors.email}
//           />
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             name="password"
//             label="Password"
//             type="password"
//             data-testid="password-login"
//             autoComplete="current-password"
//             value={formik.values.password}
//             onChange={formik.handleChange}
//             id="password"
//             error={formik.touched.password && Boolean(formik.errors.password)}
//             helperText={formik.touched.password && formik.errors.password}
//           />
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             sx={{ mt: 3, mb: 2, backgroundColor: "darkred" }}
//           >
//             Sign In
//           </Button>
//           <Grid container>
//             <Grid item xs>
//               <Link href="#" variant="body2">
//                 Forgot password?
//               </Link>
//             </Grid>
//             <Grid item>
//               <Link
//                 onClick={() => {
//                   navigate("/SignUp");
//                 }}
//               >
//                 {"Don't have an account? Sign Up"}
//               </Link>
//             </Grid>
//           </Grid>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default Login;
