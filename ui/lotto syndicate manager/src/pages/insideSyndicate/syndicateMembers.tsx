import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import NameCard from "./members";
import Box from "@mui/material/Box";
import fetchGamesBySyndicateId from "../../utils/games";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchUserBySyndicateId } from "../../utils/members";

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
      <Typography variant="h2" gutterBottom>
        Members
      </Typography>
      <Box display="flex" justifyContent="center">
        <Grid container spacing={10} justifyContent="center">
          {data.map((item) => (
            <Grid item xs={4}>
              <NameCard data={item} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default SyndicateMembers;
