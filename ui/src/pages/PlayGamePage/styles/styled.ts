import { Paper, styled } from "@mui/material";

const StyledPaper = styled(Paper)`
  background-color: darkgrey;
  color: white;
  margin: 10vh 10vw;
  box-shadow: 0px 0px 10px black;

`;

const StyledPaperTop = styled(Paper)`
background-color: darkred;
padding-bottom: 10%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
box-shadow: 0px 0px 10px black;

`

export { StyledPaper, StyledPaperTop};