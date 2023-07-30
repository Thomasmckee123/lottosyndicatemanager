import * as React from "react";
import { TextField } from "@mui/material";

function ImageInput() {
  return (
    <TextField
      variant="outlined"
      type="file"
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
}

export default ImageInput;
