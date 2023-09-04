// src/HomePage.js
import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Paper, Typography } from "@mui/material";
import { NavigationRoutes } from "../../../constants";

function PlayOrView() {
  return (
    <Container>
      <Paper
        sx={{
          padding: "30px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
          marginTop: "20px",
          backgroundColor: "#f4f6f8", // a soft background color
        }}
      >
        <Typography variant="h5" color="textSecondary">
          Game Options
        </Typography>
        <div style={{ display: "flex", gap: "20px" }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ backgroundColor: "darkRed" }}
            component={Link}
            to={NavigationRoutes.ARCHIVEPAGE}
          >
            Archived Games
          </Button>
          <Button
            variant="contained"
            color="secondary"
            sx={{ backgroundColor: "darkRed" }}
            component={Link}
            to={NavigationRoutes.GAMEPAGE}
          >
            Your Games
          </Button>
        </div>
      </Paper>
    </Container>
  );
}

export default PlayOrView;
