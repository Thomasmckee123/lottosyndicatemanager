import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import Box from "@mui/material/Box";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchUserBySyndicateId } from "../../../services/members";

import TokenUtils from "../../../integrations/token";
import Members from "./Members";
import { Paper } from "@mui/material";

function SyndicateMembers() {
  const { syndicateId } = useParams<{ syndicateId: string }>();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetchUserBySyndicateId(Number(syndicateId))
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
  }, []);

  return (
    <>
      <Paper sx={{ backgroundColor: "darkRed", color: "white" }}>
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <Typography variant="h2" gutterBottom>
            Members
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center">
          <Grid container spacing={10} justifyContent="center">
            {Array.isArray(data) &&
              data.map((item) => (
                <Grid item xs={4}>
                  <Members data={item} />
                </Grid>
              ))}
          </Grid>
        </Box>
      </Paper>
    </>
  );
}

export default SyndicateMembers;
