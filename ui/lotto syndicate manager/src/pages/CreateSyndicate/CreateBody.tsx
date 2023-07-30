import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

function NameInput() {
  return (
    <Box
      sx={{
        width: 500,
        maxWidth: "100%",
        backgroundColor: "white",
      }}
    >
      <TextField fullWidth label="Name of syndicate" id="fullWidth" />
    </Box>
  );
}
export default NameInput;
