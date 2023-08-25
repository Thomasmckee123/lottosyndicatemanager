import { useEffect, useState } from "react";
import { useCountdown } from "../../hooks/useCountdown";
import { updateDates, fetchGamesWePlay } from "../../services/gameTypes";
import { archiveGame, createGame } from "../../services/games";
import { Grid, Paper } from "@mui/material";
import {
  CountdownContainer,
  GridItem,
  NumberRemaining,
  StyledPaper,
} from "./styled";

const CountDown: any = ({ drawDate, gameId, userSyndicateId }: any) => {
  const [days, hours, minutes] = useCountdown(drawDate);
  const [isOver, setIsOver] = useState<boolean>(false);
  useEffect(() => {
    const executeGameEndProcess = async () => {
      if (days <= 0 && hours <= 0 && minutes <= 0) {
        setIsOver(true); // Assuming setIsOver is synchronous
        try {
          console.log("FRONT END DRAW DATE", drawDate);
          updateDates(Number(gameId), drawDate);
          await archiveGame(gameId);
          fetchGamesWePlay();
        } catch (error) {
          console.error("Error in game end process:", error);
        }
      }
    };

    executeGameEndProcess();
  }, [minutes]);

  if (isOver) {
    return <p>Time's up!</p>;
  }
  return (
    <StyledPaper>
      <CountdownContainer container>
        <GridItem>
          <NumberRemaining>{days}</NumberRemaining>
          <Grid>{days === 1 ? "day" : "days"}</Grid>
        </GridItem>
        <GridItem>
          <NumberRemaining>{hours}</NumberRemaining>
          <Grid>{hours === 1 ? "hour" : "hours"}</Grid>
        </GridItem>
        <GridItem>
          <NumberRemaining>{minutes}</NumberRemaining>
          <Grid>{minutes === 1 ? "minute" : "minutes"}</Grid>
        </GridItem>
      </CountdownContainer>
    </StyledPaper>
  );
};

export default CountDown;
//