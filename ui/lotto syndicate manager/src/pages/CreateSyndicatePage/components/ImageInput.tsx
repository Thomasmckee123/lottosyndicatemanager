import * as React from "react";
import { TextField } from "@mui/material";

interface Props {
  value: File | null;
  setValue: (value: File | null) => void;
}

const ImageInput: React.FC<Props> = ({ value, setValue }) => {
  return (
    <TextField
      variant="outlined"
      type="file"
      InputLabelProps={{
        shrink: true,
        style: { fontWeight: "bold", color: "#333" },
      }}
      InputProps={{
        style: { backgroundColor: "#f5f5f5", borderRadius: "5px" },
      }}
      sx={{ width: "100%" }}
      onChange={(e) => {
        const target = e.target as HTMLInputElement;
        if (target.files) {
          setValue(target.files[0]);
        }
      }}
    />
  );
};

export default ImageInput;
