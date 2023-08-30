import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavigationRoutes } from "../../constants";
import { AuthContext } from "../../contexts";
function Logout() {
  const navigate = useNavigate();
  const { handleLogout } = AuthContext.useLogin();
  useEffect(() => {
    handleLogout();
  }, []);

  return (
    <>
      <CircularProgress />
    </>
  );
}
export default Logout;
