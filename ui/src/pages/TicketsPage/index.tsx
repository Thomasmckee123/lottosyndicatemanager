import { Link, useParams } from "react-router-dom";
import TicketInput from "../PlayGamePage/components/inputNumbers";
import { Button } from "@mui/material";
import { NavigationRoutes } from "../../constants";
import SelectedNumbers from "../PlayGamePage/components/balls";

export function ViewTicketsPage() {
  const { syndicateId, userSyndicateId, gameId } = useParams<{
    gameId: string;
    syndicateId: string;
    userSyndicateId: string;
  }>();

  return (
    <>
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
      <SelectedNumbers gameId={gameId} />
    </>
  );
}
