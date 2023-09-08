import { CircularProgress } from "@mui/material";
import { useEffect } from "react";

import useTokens from "../../hooks/useTokens";
function Logout() {
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
