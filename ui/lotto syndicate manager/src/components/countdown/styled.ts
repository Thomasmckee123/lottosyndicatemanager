import { Grid, Paper } from "@mui/material";
import styled from "styled-components";

export const StyledPaper = styled(Paper)`
  background-color: darkred;
  color: white;
  padding: 16px;
`;

export const CountdownContainer = styled(Grid)`
  display: flex;
  justify-content: space-around;
`;

export const GridItem = styled(Grid)`
  text-align: center;
  line-height: 1;
`;

export const NumberRemaining = styled.span`
  font-size: 24px;
  font-weight: bold;
`;
