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
      data-testid="description-input-box"
      component="form"
      sx={{
        "& .MuiTextField-root": {
          width: "100%",
          backgroundColor: "#f5f5f5",
          borderRadius: "5px",
        },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={4}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          variant="outlined"
          InputProps={{
            style: { padding: "10px" },
          }}
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
      </div>
    </Box>
  );
};

export default DescriptionInput;
