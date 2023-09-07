import { Link, useParams } from "react-router-dom";
import TicketInput from "../PlayGamePage/components/inputNumbers";
import { Button } from "@mui/material";
import { NavigationRoutes } from "../../constants";

export function NormalTicketInput() {
  const { roleId, syndicateId, userSyndicateId } = useParams<{
    roleId: string;
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
      <TicketInput roleId={4} />
    </>
  );
}
