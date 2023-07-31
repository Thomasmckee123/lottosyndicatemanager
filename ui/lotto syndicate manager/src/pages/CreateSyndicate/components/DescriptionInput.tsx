import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function DescriptionInput() {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          sx={{ backgroundColor: "white" }}
          id="outlined-multiline-static"
          multiline
          rows={4}
          defaultValue="Description"
        />
      </div>
    </Box>
  );
}
export default DescriptionInput;
