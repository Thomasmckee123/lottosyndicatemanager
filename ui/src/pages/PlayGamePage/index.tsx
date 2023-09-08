import { useEffect, useState } from "react";
import TicketInput from "./components/inputNumbers";
import Messages from "./components/messageBoard";
import { fetchUserGamesByUserGameId } from "../../services/userGames";
import { Link, useParams } from "react-router-dom";
import { StyledPaper } from "./styles/styled";
import { Button } from "@mui/material";
import { NavigationRoutes } from "../../constants";

function Message() {
  const [roleId, setRoleId] = useState<number>(0);
  const { userGameId } = useParams<{ userGameId: string }>();

  useEffect(() => {
    fetchUserGamesByUserGameId(Number(userGameId)).then((response) => {
      setRoleId(response[0].roleId);
    });
  }, [userGameId]);

  return (
    <>
      <Link to={NavigationRoutes.GAMEPAGE}>
        <Button
          variant="contained"
          color="primary"
          sx={{ backgroundColor: "darkRed" }}
        >
          View Your Games
        </Button>
      </Link>
      <StyledPaper>
        <Messages />
        <TicketInput roleId={Number(roleId)} />
      </StyledPaper>
    </>
  );
}
export default Message;
