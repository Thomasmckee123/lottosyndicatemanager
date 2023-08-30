import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import SyndicateCard from "./SyndicateCard";
import { useEffect, useState } from "react";
import { fetchHomePageSyndicateData } from "../../../services/syndicates";
import TokenUtils from "../../../integrations/token";
import Header from "./Header";
import { Alert, Snackbar } from "@mui/material";

function SyndicateContainer() {
  const [data, setData] = useState<any[]>([]);
  const jwt = TokenUtils.getJWT();
  const userId = jwt.claims.userId;
  const [open, setOpen] = useState(false);
  const fetchData = () => {
    fetchHomePageSyndicateData(userId)
      .then((response) => {
        if (Array.isArray(response)) {
          setData(response);
        } else {
          setData([response]);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  const handleDeleteSyndicate = (idToDelete: any) => {
    // Filter out the syndicate you want to delete
    const updatedData = data.filter((syndicate) => syndicate.id !== idToDelete);
    setData(updatedData);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  console.log(data);
  return (
    <>
      <CssBaseline />

      <Container maxWidth="xl">
        <Header />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "90vh",
            borderRadius: "20px",
            boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
            padding: "20px",
          }}
        >
          {" "}
          <Box
            sx={{
              bgcolor: "gray",
              width: "100%",
              height: "90%", // Updated height to 90%
              overflow: "auto",
              borderRadius: "20px",
              padding: "20px",
            }}
          >
            <Grid container spacing={2}>
              {data.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                  <SyndicateCard
                    propData={item}
                    onDelete={handleDeleteSyndicate}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="success">
            You have left the syndicate!
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
}

export default SyndicateContainer;
