import { useEffect, useState } from "react";
import TokenUtils from "../../integrations/token";
import UserGames from "../gamePage/components/userGames";
import { fetchArchives } from "../../services/games";
import { Box, Typography } from "@mui/material";

function Archive() {
  let jwt = TokenUtils.getJWT();
  const userId = jwt?.claims?.userId;
  const [games, setGames] = useState<any[]>([]);
  useEffect(() => {
    fetchArchives(Number(userId))
      .then((response) => {
        if (Array.isArray(response)) {
          setGames(response);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const filteredData = games.filter((game) => game.games.maximumPlayers < 200);
  return (
    <>
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Typography variant="h4" gutterBottom>
          Archived Games
        </Typography>
      </Box>
      <UserGames filteredData={filteredData} />
    </>
  );
}
export default Archive;
