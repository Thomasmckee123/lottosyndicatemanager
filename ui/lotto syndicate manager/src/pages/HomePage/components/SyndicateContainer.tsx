import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import SyndicateCard from "./SyndicateCard";
import { useEffect, useState } from "react";
import { fetchHomePageSyndicateData } from "../../../services/syndicates";
import TokenUtils from "../../../integrations/token";
import Header from "./Header";

function SyndicateContainer() {
  const [data, setData] = useState<any[]>([]);
  const jwt = TokenUtils.getJWT();
  const userId = jwt.claims.userId;
  useEffect(() => {
    fetchHomePageSyndicateData(userId)
      .then((response) => {
        setData(response[0]);
        if (Array.isArray(response)) {
          setData(response);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  console.log(data);
  return (
    <>
      <CssBaseline />
      <Header />
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
              {data.map((item) => (
                <Grid item xs={6} md={4}>
                  <SyndicateCard data={item} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default SyndicateContainer;
