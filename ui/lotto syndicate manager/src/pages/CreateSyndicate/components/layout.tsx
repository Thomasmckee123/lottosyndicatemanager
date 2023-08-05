import * as React from "react";
import Box from "@mui/material/Box";
import { Button, Grid, Typography, useTheme } from "@mui/material";
import NameInput from "./CreateBody";
import DescriptionInput from "./DescriptionInput";
import ImageInput from "./ImageInput";
import { createSyndicate } from "../../../utils/syndicates";
import { useState } from "react";
import TokenUtils from "../../../integrations/token";
import jwt_decode from "jwt-decode";
import { useParams } from "react-router-dom";

function InputArea() {
  const theme = useTheme();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null); // Initial state is null
  const { ownerId } = useParams<{ ownerId: string }>();
  // console.log(decodedJwt.userId);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submit action
    if (!image) {
      alert("Please select an image.");
      return;
    }
    console.log(ownerId);
    try {
      if (ownerId) {
        await createSyndicate(name, description, image, ownerId);
      } else {
        console.error("ownerId is undefined!");
      }
      setName("");
      setDescription("");
      setImage(null);
    } catch (error) {
      console.error("Error creating syndicate:", error);
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
          left: "20vw",
          display: "flex",
          flexDirection: "column",
          width: "70vw",
          maxHeight: "70vh",
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
          <Grid item xs={12}>
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
                backgroundColor: "darkred",
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
    </>
  );
}
export default InputArea;
