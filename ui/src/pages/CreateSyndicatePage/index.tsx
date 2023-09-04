import * as React from "react";
import InputArea from "./components/layout";
import { Button, Paper } from "@mui/material";
import { Link } from "react-router-dom";

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
          to="/"
          variant="contained"
          sx={{ margin: "1rem", backgroundColor: "darkRed" }}
        >
          Go back to homepage
        </Button>
        <div>
          <InputArea />
        </div>
      </Paper>
    </>
  );
}

export default CreateSyndicate;
