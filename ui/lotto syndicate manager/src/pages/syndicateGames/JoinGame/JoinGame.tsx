import { Box, Grid } from "@mui/material";
import Games from "./differentGames";
import { useEffect, useState } from "react";
import fetchGamesBySyndicateId from "../../../utils/games";
import { useParams } from "react-router-dom";

function JoinGame() {
  const { syndicateId } = useParams<{ syndicateId: string }>();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetchGamesBySyndicateId(Number(syndicateId))
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
  return (
    <Box
      sx={{
        width: "70vw",
        height: "70vh",
        backgroundColor: "darkgray",
        overflow: "auto", // add overflow
        position: "absolute", // centering
        top: "50%", // centering
        left: "50%", // centering
        transform: "translate(-50%, -50%)", // centering
      }}
    >
      <Grid container spacing={2}>
        {data.map((item) => (
          <Grid item xs={6} md={4}>
            <Games data={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default JoinGame;
