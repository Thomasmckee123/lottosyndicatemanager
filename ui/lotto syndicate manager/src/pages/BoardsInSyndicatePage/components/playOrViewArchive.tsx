// src/HomePage.js
import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";
import { NavigationRoutes } from "../../../constants";

function PlayOrView() {
  return (
    <Container>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to={NavigationRoutes.ARCHIVEPAGE}
      >
        Archived Games
      </Button>
      <Button
        variant="contained"
        color="secondary"
        component={Link}
        to={NavigationRoutes.GAMEPAGE}
        style={{ marginLeft: "20px" }}
      >
        Your Games
      </Button>
    </Container>
  );
}

export default PlayOrView;
