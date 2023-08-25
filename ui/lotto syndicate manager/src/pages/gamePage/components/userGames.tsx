import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";
import { fetchUserGames } from "../../../services/userGames";
import TokenUtils from "../../../integrations/token";
import { NavigationRoutes } from "../../../constants";
import { Link } from "react-router-dom";
import CountDown from "../../../components/countdown";

const UserGames = () => {
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

  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (event: any, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Your Games
      </Typography>

      {data.map((game: any) => (
        <Accordion
          key={game?.id}
          expanded={expanded === `panel${game?.id}`}
          onChange={handleChange(`panel${game?.id}`)}
        >
          <AccordionSummary
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={game?.games?.syndicates?.avatar}
                style={{ marginRight: "10px", width: "100px", height: "100px" }}
              />
              <Typography>{game?.games?.gameTypes?.name}</Typography>
            </div>
            <Typography
              style={{ fontWeight: "bold", textAlign: "center", flex: 1 }}
            >
              {game?.games?.syndicates?.name}
            </Typography>
            <Typography style={{ marginLeft: "auto" }}>
              {game?.games?.syndicateName}
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            style={{
              backgroundColor: "darkGrey",
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.8, // Set the opacity of the AccordionDetails component
            }}
          >
            <Container>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>{game?.roles?.name}</TableCell>
                      <TableCell align="right">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell align="right">
                        ${game?.games.treasury}
                      </TableCell>
                      <TableCell align="right">
                        <Link
                          to={NavigationRoutes.GAMEMESSAGE.replace(
                            ":userGameId",
                            `${game.id}`
                          ).replace(":gameId", `${game?.games?.id}`)}
                        >
                          <Button variant="contained" color="primary">
                            Enter Chat
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <CountDown
                drawDate={game?.games?.gameTypes?.drawDate}
                gameId={game?.games?.id}
              />
            </Container>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default UserGames;
