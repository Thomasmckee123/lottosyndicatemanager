import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import SyndicateCard from "./SyndicateCard";
import ButtonAppBar from "./Header";

function Item(props: { children: React.ReactNode }) {
  return (
    <div style={{ padding: 20, border: "1px solid black" }}>
      {props.children}
    </div>
  );
}

function SimpleContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
      <ButtonAppBar />
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "80vh",
          }}
        >
          <Box
            sx={{
              bgcolor: "gray",
              width: "80vw", // This will set the width to be 80% of the viewport width
              height: "70vh", // Adjust the height here if needed
              overflow: "auto", // This will add a scrollbar when content overflows
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={6} md={4}>
                <SyndicateCard />
              </Grid>
              <Grid item xs={6} md={4}>
                <SyndicateCard />
              </Grid>
              <Grid item xs={6} md={4}>
                <SyndicateCard />
              </Grid>
              <Grid item xs={6} md={4}>
                <SyndicateCard />
              </Grid>
              <Grid item xs={6} md={4}>
                <SyndicateCard />
              </Grid>
              <Grid item xs={6} md={4}>
                <SyndicateCard />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default SimpleContainer;
