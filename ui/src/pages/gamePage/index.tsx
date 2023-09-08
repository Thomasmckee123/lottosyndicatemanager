import { useEffect, useState } from "react";
import { fetchUserGames } from "../../services/userGames";
import UserGames from "./components/userGames";
import TokenUtils from "../../integrations/token";
import { Box, Typography } from "@mui/material";

function GamePage() {
  const [data, setData] = useState<any[]>([]);
  const jwt = TokenUtils.getJWT();
  let userId = jwt?.claims?.userId;
  useEffect(() => {
    fetchUserGames(Number(userId))
      .then((response) => {
        setData(response);
        return response;
      })

      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [userId]);
  console.log(data);

  const filteredData = data.filter((game) => game.games.maximumPlayers < 200);
  return (
    <>
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Typography variant="h4" gutterBottom>
          Your Games
        </Typography>
      </Box>
      <UserGames filteredData={filteredData} />
    </>
  );
}

export default GamePage;
