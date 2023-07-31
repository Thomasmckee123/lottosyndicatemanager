import * as React from "react";
import Box from "@mui/material/Box";
import { Button, Grid, Typography, useTheme } from "@mui/material";
import NameInput from "./CreateBody";
import DescriptionInput from "./DescriptionInput";
import ImageInput from "./ImageInput";

function InputArea() {
  const theme = useTheme();

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
            <NameInput />
          </Grid>

          <Grid item xs={12}>
            <DescriptionInput />
          </Grid>

          <Grid item xs={12}>
            <ImageInput />
          </Grid>
          <Grid item xs={12}>
            <Button
              sx={{
                backgroundColor: "darkred",
                color: "white",
                alignSelf: "flex-end",
              }}
              variant="contained"
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
