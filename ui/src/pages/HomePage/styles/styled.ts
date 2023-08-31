import { Box, CardHeader, Grid, Paper } from "@mui/material";
import styled from "styled-components";

export const StyledPaper = styled(Paper)`
  background-color: darkred;
  color: white;
  padding: 16px;
`;

export const StyledCardHeader = styled(CardHeader)`
background-color: darkred;
color:white;`
export const CustomBox = styled(Box)`
background-color: dimgrey;
color: white;
width: 20%;
height: 50%;

display: flex;
flex-direction: column;
align-items: center;
justify-content:center;
margin-bottom: 1%;
margin-top: 2%;
box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);

`
