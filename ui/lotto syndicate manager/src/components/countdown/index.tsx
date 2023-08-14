import { useCountdown } from "../../hooks/useCountdown";

const CountDown = ({ drawDate }: any) => {
  const [days, hours, minuites] = useCountdown(drawDate);

  return (
    <>
      days : {days}
      hours: {hours}
      minuites: {minuites}
    </>
  );
};

export default CountDown;
