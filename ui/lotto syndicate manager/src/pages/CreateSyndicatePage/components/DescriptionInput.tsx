import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
interface Props {
  value: string;
  setValue: (value: string) => void;
}

const DescriptionInput: React.FC<Props> = ({ value, setValue }) => {
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
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </Box>
  );
};

export default DescriptionInput;
