import { Paper, styled } from "@mui/material";

const StyledPaper = styled(Paper)`
  background-color: darkgrey;
  color: white;
  padding: 16px;
  height : 80vh;
`;
const SearchPaper = styled(Paper)`
width: 100%;
background-color: grey;
height: 20%;
display: flex;
justify-content: center;
align-items:center;`


export {StyledPaper,SearchPaper};