import { useEffect, useState } from "react";
import TicketInput from "./components/inputNumbers";
import Messages from "./components/messageBoard";
import { fetchUserGamesByUserGameId } from "../../services/userGames";
import { useParams } from "react-router-dom";

function Message() {
  const [roleId, setRoleId] = useState<Number>(0);
  const { userGameId } = useParams<{ userGameId: string }>();
  useEffect(() => {
    fetchUserGamesByUserGameId(Number(userGameId)).then((response) => {
      console.log("RESPONSE", response);
      setRoleId(response[0].roleId);
    });
  }, [userGameId]);
  return (
    <>
      <Messages />
      <TicketInput roleId={Number(roleId)} />
    </>
  );
}
export default Message;
