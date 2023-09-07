import * as React from "react";
import InputArea from "./components/layout";
import { Button, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import { NavigationRoutes } from "../../constants";

function CreateSyndicate() {
  return (
    <>
      <Paper
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <Button
          component={Link}
          to={NavigationRoutes.VIEWSYDICATES}
          variant="contained"
          sx={{ margin: "1rem", backgroundColor: "darkRed" }}
        >
          View your syndicates
        </Button>
        <div>
          <InputArea />
        </div>
      </Paper>
    </>
  );
}

export default CreateSyndicate;
