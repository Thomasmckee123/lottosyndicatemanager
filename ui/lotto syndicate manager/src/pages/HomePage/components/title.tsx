import Button from "@mui/material/Button";
import createSvgIcon from "@mui/material/utils/createSvgIcon";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";

import { NavigationRoutes } from "../../../constants";
import TokenUtils from "../../../integrations/token";

const PlusIcon = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-6 w-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5v15m7.5-7.5h-15"
    />
  </svg>,
  "Plus"
);
console.log(localStorage);
function Title() {
  const [data, setData] = useState<any>();

  useEffect(() => {
    const jwt = TokenUtils.getJWT();
    setData(jwt);
  }, []);

  return (
    <>
      <div className="welcomeContainer">
        <h1 className="welcomeMessage">
          Welcome {data ? `${data.claims.first_name}` : "..."}
        </h1>
        <div className="buttonContainer">
          <Box>
            {/* Use the NavLink component to link to the "create" route */}
            <Link
              to={NavigationRoutes.CREATESYNDICATE.replace(
                ":ownerId",
                `${data?.claims?.userId}`
              )}
            >
              <Button startIcon={<PlusIcon />}>Create a new syndicate</Button>
            </Link>
          </Box>
        </div>
      </div>
    </>
  );
}

export default Title;
