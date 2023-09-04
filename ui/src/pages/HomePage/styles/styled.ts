import { Box, CardHeader, Container, Grid, Paper } from "@mui/material";
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
width: 30vw;
height: 18vh;

display: flex;
flex-direction: column;
align-items: center;
justify-content:center;
margin-bottom: 1%;
margin-top: 2%;
box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
border-radius: 5px

`



export const CustomContainer = styled(Box)`
  margin-top: "20vh";
  background-color: "darkGrey";
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  border-radius: 5px;
  box-shadow: 0px 0px 20px black;
  padding: 20px;
  height: 60vh;
  overflow: auto;
`;