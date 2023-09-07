import { Link, useParams } from "react-router-dom";
import TicketInput from "../PlayGamePage/components/inputNumbers";
import { Button, Paper } from "@mui/material";
import { NavigationRoutes } from "../../constants";
import SelectedNumbers from "../PlayGamePage/components/balls";
import Messages from "../PlayGamePage/components/messageBoard";
export function GameStats() {
  const { syndicateId, userSyndicateId, gameId } = useParams<{
    gameId: string;
    syndicateId: string;
    userSyndicateId: string;
  }>();

  return (
    <>
      <Paper sx={{ margin: "5%" }}>
        <Messages />

        <Link
          to={NavigationRoutes.SYNDICATEBOARDS.replace(
            ":syndicateId",
            `${syndicateId}`
          ).replace(":userSyndicateId", `${userSyndicateId}`)}
        >
          <Button
            variant="outlined"
            sx={{ backgroundColor: "darkRed", color: "white" }}
          >
            Return to syndicate
          </Button>{" "}
        </Link>
      </Paper>
    </>
  );
}
