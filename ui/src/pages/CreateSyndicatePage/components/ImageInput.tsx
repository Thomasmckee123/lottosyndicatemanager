import * as React from "react";
import { Button, TextField } from "@mui/material";
import FileUpload from "../../../services/fileUpload";
import { useState } from "react";
import { uploadSyndicateImage } from "../../../services/syndicates";

interface Props {
  value: File | null;
  setValue: (value: File | null) => void;
}

const ImageInput: React.FC<Props> = ({ value, setValue }) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    setValue(file);
  };

  const handleRemoveImage = () => {
    setUploadedFile(null);
    setValue(null);
  };

  return (
    <>
      <Button
        variant="outlined"
        component="label"
        sx={{
          backgroundColor: "#f5f5f5",
          borderRadius: "5px",
          padding: "10px",
          marginTop: "10px",
        }}
      >
        {uploadedFile ? "Change Image" : "Upload Image"}
        <FileUpload onUpload={handleFileUpload} />
      </Button>
      {uploadedFile && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <TextField
            variant="outlined"
            type="text"
            value={uploadedFile?.name || ""}
            InputLabelProps={{
              shrink: true,
              style: { fontWeight: "bold", color: "#333" },
            }}
            InputProps={{
              readOnly: true,
              style: { backgroundColor: "#f5f5f5", borderRadius: "5px" },
            }}
            sx={{ width: "100%" }}
          />
          <Button
            variant="outlined"
            onClick={handleRemoveImage}
            sx={{ marginLeft: "10px" }}
          >
            Remove
          </Button>
        </div>
      )}
    </>
  );
};

export default ImageInput;
