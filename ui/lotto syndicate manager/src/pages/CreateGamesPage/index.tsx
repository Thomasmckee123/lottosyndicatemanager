import { Box, Grid, Typography } from "@mui/material";

import { useEffect, useState } from "react";
import { fetchGamesBySyndicateId } from "../../services/games";
import { useParams } from "react-router-dom";
import ProposeGames from "./components/ProposeGames";
import CreatePersonalisedGame from "./components/createPersonalisedGame";

function CreateGame() {
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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 4, // space between elements
      }}
    >
      <Box
        sx={{
          width: "70vw",
          height: "70vh",
          backgroundColor: "darkgray",
          overflow: "auto",
          marginBottom: 2, // space below this box
        }}
      >
        <Grid container spacing={2}>
          {data.map((item, index) => (
            <Grid item xs={6} md={4} key={index}>
              <ProposeGames data={item} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box
        sx={{
          width: "70vw",
          height: "10vh",
          backgroundColor: "darkred",
          borderRadius: "10%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: 5,
        }}
      >
        <Typography variant="h3">Customise your own game</Typography>
      </Box>
      <Box
        sx={{
          width: "70vw",
          height: "50vh",
          padding: 2,
          backgroundColor: "lightgray", // to differentiate this box from the previous one
          borderRadius: "10px", // rounded corners
        }}
      >
        <CreatePersonalisedGame />
      </Box>
    </Box>
  );
}

export default CreateGame;
