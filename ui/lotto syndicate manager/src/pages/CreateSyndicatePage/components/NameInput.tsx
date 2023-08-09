import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

interface Props {
  value: string;
  setValue: (value: string) => void;
}

const NameInput: React.FC<Props> = ({ value, setValue }) => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100%",
        backgroundColor: "white",
      }}
    >
      <TextField
        fullWidth
        label="Name of syndicate"
        id="fullWidth"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </Box>
  );
};

export default NameInput;
