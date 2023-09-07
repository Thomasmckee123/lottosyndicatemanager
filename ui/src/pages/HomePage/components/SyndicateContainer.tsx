import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import SyndicateCard from "./SyndicateCard";
import { useEffect, useState } from "react";
import { fetchHomePageSyndicateData } from "../../../services/syndicates";
import TokenUtils from "../../../integrations/token";
import Header from "./Header";
import { Alert, Button, Snackbar } from "@mui/material";
import { CustomContainer } from "../styles/styled";
import { NavigationRoutes } from "../../../constants";
import { Link } from "react-router-dom";

function SyndicateContainer({ role }: { role: number }) {
  console.log("role", role);
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
        <Header />{" "}
        <CustomContainer
          sx={{
            marginTop: "2vh",
            backgroundColor: "darkGrey",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "spaceBetween",
            alignItems: "center",
            borderRadius: "2px",
            boxShadow: "0px 0px 20px black",
            padding: "20px",
            height: "60vh",
            overflow: "auto",
          }}
        >
          {data.length > 0 ? (
            data.map((item) => (
              <SyndicateCard
                role={role}
                propData={item}
                onDelete={handleDeleteSyndicate}
              />
            ))
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              {role == 1 ? (
                <Link to={NavigationRoutes.VIEWSYDICATES}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ backgroundColor: "darkRed" }}
                  >
                    Join Syndicates
                  </Button>
                </Link>
              ) : role == 2 ? (
                <Link to={NavigationRoutes.CREATESYNDICATE}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ backgroundColor: "darkRed" }}
                  >
                    Create Syndicates
                  </Button>
                </Link>
              ) : null}
            </Box>
          )}
        </CustomContainer>
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
