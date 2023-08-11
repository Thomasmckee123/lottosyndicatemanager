import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import Box from "@mui/material/Box";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchUserBySyndicateId } from "../../../services/members";

import TokenUtils from "../../../integrations/token";
import Members from "./Members";

function SyndicateMembers() {
  const { syndicateId } = useParams<{ syndicateId: string }>();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const jwt = TokenUtils.getJWT();
    setData(jwt);
    console.log(syndicateId);

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
      <Typography variant="h2" gutterBottom>
        Members
      </Typography>
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
    </>
  );
}

export default SyndicateMembers;
