import { useEffect, useState } from "react";
import { useCountdown } from "../../hooks/useCountdown";
import { updateDates, fetchGamesWePlay } from "../../services/gameTypes";
import { archiveGame } from "../../services/games";
import { Grid } from "@mui/material";
import {
  CountdownContainer,
  GridItem,
  NumberRemaining,
  StyledPaper,
} from "./styled";

const CountDown: any = ({ drawDate, gameId }: any) => {
  const [days, hours, minutes] = useCountdown(drawDate);
  const [isOver, setIsOver] = useState<boolean>(false);
  useEffect(() => {
    const executeGameEndProcess = async () => {
      if (days <= 0 && hours <= 0 && minutes <= 0) {
        setIsOver(true); // Assuming setIsOver is synchronous
        try {
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
    <StyledPaper sx={{ backgroundColor: "darkRed", color: "white" }}>
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
