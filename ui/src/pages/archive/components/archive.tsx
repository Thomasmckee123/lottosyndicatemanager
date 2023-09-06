import * as React from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Grid,
  Divider,
  Button,
  Link,
} from "@mui/material";
import { fetchArchives } from "../../../services/games";
import { useEffect, useState } from "react";
import TokenUtils from "../../../integrations/token";
import { NavigationRoutes } from "../../../constants";

const ArchivedGames = () => {
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

  if (games.length === 0) {
    return (
      <Container>
        <Typography variant="h4" gutterBottom>
          Archived Games
        </Typography>
        <Box my={4}>
          <Typography variant="body1" align="center">
            No archived games available at the moment.
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Archived Games
      </Typography>
      <Divider sx={{ my: 3 }} />
      <Grid container spacing={3}>
        {games.map((game) => (
          <Grid item xs={12} md={6} key={game.id}>
            <Card elevation={3}>
              <CardHeader
                avatar={<Avatar src={game.gameTypes.image} />}
                title={game.gameTypes.name}
                subheader={`Draw Date: ${new Date(
                  game.gameTypes.drawDate
                ).toLocaleDateString()}`}
                titleTypographyProps={{ variant: "h5" }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  User Syndicate Info
                </Typography>
                <Typography variant="body1">
                  {game.userSyndicates.users.firstName}{" "}
                  {game.userSyndicates.users.lastName}
                </Typography>
                <Typography variant="body2">
                  {game.userSyndicates.users.email}
                </Typography>

                <Box mt={3}>
                  <Typography variant="h6" gutterBottom>
                    Syndicate
                  </Typography>
                  <Typography variant="body1">
                    {game.userSyndicates.syndicates.name}
                  </Typography>
                  <Typography variant="body2">
                    {game.userSyndicates.syndicates.description}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ArchivedGames;
