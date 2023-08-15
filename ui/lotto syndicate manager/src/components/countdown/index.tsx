import { useEffect, useState } from "react";
import { useCountdown } from "../../hooks/useCountdown";
import {
  archiveGames,
  autoCreateGames,
  fetchGamesWePlay,
} from "../../services/gameTypes";

const CountDown: any = ({ drawDate, gameId }: any) => {
  const [days, hours, minutes] = useCountdown(drawDate);
  const [isOver, setIsOver] = useState<boolean>(false);
  useEffect(() => {
    if (days <= 0 && hours <= 0 && minutes <= 0 && !isOver) {
      setIsOver(true);
      archiveGames(Number(gameId))
        .then(() => autoCreateGames())
        .finally(() => fetchGamesWePlay());
    }
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
