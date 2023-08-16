import { useEffect, useState } from "react";
import { useCountdown } from "../../hooks/useCountdown";
import {
  updateDates,
  fetchGamesWePlay,
} from "../../services/gameTypes";
import { archiveGame, createGame } from "../../services/games";

const CountDown: any = ({ drawDate, gameId ,userSyndicateId}: any) => {
  const [days, hours, minutes] = useCountdown(drawDate);
  const [isOver, setIsOver] = useState<boolean>(false);
  useEffect(() => {
    const executeGameEndProcess = async () => {
      if (days <= 0 && hours <= 0 && minutes <= 0 ) {
        setIsOver(true); // Assuming setIsOver is synchronous
        try {
          console.log("FRONT END DRAW DATE", drawDate) 
          updateDates(Number(gameId), drawDate);
          await archiveGame(gameId);
          fetchGamesWePlay();
        } catch (error) {
          console.error('Error in game end process:', error);
        }
      }
    };
  
    executeGameEndProcess();
  }, [minutes]);
  
  if (isOver) {       
    

    return <p>Time's up!</p>;
  }
  return (
    <>
      days : {days}
      hours: {hours}
      minuites: {minutes}
    </>
  );
};

export default CountDown;
// 