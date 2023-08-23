import * as React from "react";
import Box from "@mui/material/Box";
import { Button, Grid, Typography, useTheme } from "@mui/material";
import { Alert, AlertTitle } from "@mui/material";

import {
  createSyndicate,
  createUserSyndicate,
} from "../../../services/syndicates";
import { useState } from "react";

import { useParams } from "react-router-dom";
import ImageInput from "./ImageInput";
import DescriptionInput from "./DescriptionInput";
import NameInput from "./NameInput";

function InputArea() {
  const theme = useTheme();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null); // Initial state is null
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { ownerId } = useParams<{ ownerId: string }>();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submit action
    if (!image) {
      alert("Please select an image.");
      return;
    }
    try {
      const createdSyndicate = await createSyndicate(
        name,
        description,
        image,
        Number(ownerId)
      );
      setName("");
      setDescription("");
      setImage(null);
      setSuccessMessage("Syndicate created successfully!");
      //automatically setting the role id to 1
      const roleId = 1;
      const userId = ownerId;
      const syndicateId = createdSyndicate;
      await createUserSyndicate(
        new Date(),
        Number(userId),
        Number(syndicateId),
        Number(roleId)
      );
    } catch (error) {
      console.error("Error creating syndicate:", error);
      setErrorMessage("Could not create syndicate.");
    }
  };

  return (
    <>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: "#333", position: "relative", textAlign: "center" }}
      >
        Create a Syndicate
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          width: "50%",
          backgroundColor: "white",
          borderRadius: "15px",
          padding: theme.spacing(3),
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <Grid
          container
          direction="column"
          spacing={2}
          alignItems="stretch"
          justifyContent="center"
        >
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <NameInput value={name} setValue={setName} />
          </Grid>

          <Grid item xs={12}>
            <DescriptionInput value={description} setValue={setDescription} />
          </Grid>

          <Grid item xs={12}>
            <ImageInput value={image} setValue={setImage} />
          </Grid>

          <Grid item xs={12}>
            <Button
              sx={{
                backgroundColor: "darkRed",
                color: "white",
                alignSelf: "flex-end",
              }}
              variant="contained"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>

      {successMessage && (
        <Alert
          severity="success"
          sx={{ position: "fixed", bottom: "20px", right: "20px" }}
          onClose={() => setSuccessMessage("")}
        >
          <AlertTitle>Success</AlertTitle>
          {successMessage}
        </Alert>
      )}

      {errorMessage && (
        <Alert
          severity="error"
          sx={{ position: "fixed", bottom: "20px", right: "20px" }}
          onClose={() => setErrorMessage("")}
        >
          <AlertTitle>Error</AlertTitle>
          {errorMessage}
        </Alert>
      )}
    </>
  );
}

export default InputArea;
