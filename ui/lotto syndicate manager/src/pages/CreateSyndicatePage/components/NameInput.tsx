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
      component="form"
      sx={{
        "& .MuiTextField-root": {
          width: "100%",
          backgroundColor: "#f5f5f5",
          borderRadius: "5px",
        },
      }}
    >
      <TextField
        fullWidth
        label="Name of syndicate"
        id="fullWidth"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#ccc",
            },
            "&:hover fieldset": {
              borderColor: "#ccc",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#ccc",
            },
          },
        }}
      />
    </Box>
  );
};

export default NameInput;
