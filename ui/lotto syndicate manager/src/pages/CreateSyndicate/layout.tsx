import * as React from "react";
import Box from "@mui/material/Box";
import { Button, Grid, Typography, useTheme } from "@mui/material";
import NameInput from "./CreateBody";
import DescriptionInput from "./DescriptionInput";
import ImageInput from "./ImageInput";

function InputArea() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        maxWidth: "70vw",
        maxHeight: "70vh",
        width: "100%",
        height: "100%",
        backgroundColor: "darkgray",
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)", // Move the box's center to the point above
        padding: theme.spacing(2),
        [theme.breakpoints.up("md")]: {
          padding: theme.spacing(4),
        },
      }}
    >
      <Grid
        container
        rowSpacing={5}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ marginTop: 4 }}
      >
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Create a Syndicate
          </Typography>
        </Grid>

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
          <Button sx={{ backgroundColor: "darkred" }} variant="contained">
            Contained
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default InputArea;
