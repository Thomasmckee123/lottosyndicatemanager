import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavigationRoutes } from "../../constants";
import { AuthContext } from "../../contexts";
import useTokens from "../../hooks/useTokens";
function Logout() {
  const navigate = useNavigate();
  const { clearLocalStorageTokens } = useTokens();
  useEffect(() => {
    clearLocalStorageTokens();
  }, []);

  return (
    <>
      <CircularProgress />
    </>
  );
}
export default Logout;
