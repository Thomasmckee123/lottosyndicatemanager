import * as React from "react";
import InputArea from "./components/layout";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function CreateSyndicate() {
  return (
    <>
      <Button
        component={Link}
        to="/"
        variant="contained"
        sx={{ margin: "1rem", backgroundColor: "darkRed" }}
      >
        Go back to homepage
      </Button>
      <InputArea />
    </>
  );
}

export default CreateSyndicate;
