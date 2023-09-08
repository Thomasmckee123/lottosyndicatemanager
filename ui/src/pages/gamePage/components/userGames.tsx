import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CountDown from "../../../components/countdown";
import { NavigationRoutes } from "../../../constants";
import TokenUtils from "../../../integrations/token";
import { fetchUserGames } from "../../../services/userGames";

const UserGames = ({ filteredData }: any) => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (event: any, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container>
      {filteredData.map((game: any) => (
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
                      <TableCell align="right"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell align="right">
                        £{game?.games.treasury}
                      </TableCell>
                      <TableCell align="right">
                        <Link
                          to={NavigationRoutes.GAMEMESSAGE.replace(
                            ":userGameId",
                            `${game.id}`
                          ).replace(":gameId", `${game?.games?.id}`)}
                        >
                          <Button
                            variant="contained"
                            color="primary"
                            sx={{ backgroundColor: "darkRed" }}
                          >
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
