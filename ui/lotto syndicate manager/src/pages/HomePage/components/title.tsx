import Button from "@mui/material/Button";
import "./homepage.css";
import createSvgIcon from "@mui/material/utils/createSvgIcon";
import Box from "@mui/material/Box";
import { Link, NavLink } from "react-router-dom";

import { useEffect, useState } from "react";
import { Email } from "@mui/icons-material";
import TokenUtils from "../../../integrations/token";
import { NavigationRoutes } from "../../../constants";
let usersData;
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
    // fetchUserData()
    //   .then((response) => {
    //     console.log("fetchUserData response", response);
    //     let userEmail = localStorage.getItem("userEmail");
    //     console.log("localStorage.emailAddress", userEmail);
    //     let filteredData: any = [];

    //     if (userEmail) {
    //       // check if userEmail is not null
    //       // remove the quotation marks if they exist
    //       userEmail = userEmail.replace(/"/g, "");
    //       console.log("localStorage.emailAddress cleaned", userEmail);

    //       response.forEach((user: any) => {
    //         console.log("Current user in loop", user);
    //         if (userEmail) {
    //           console.log(
    //             "user.email.trim().toLowerCase():",
    //             user.email.trim().toLowerCase()
    //           );
    //           console.log(
    //             "userEmail.trim().toLowerCase():",
    //             userEmail.trim().toLowerCase()
    //           );
    //           if (
    //             user.email.trim().toLowerCase() ===
    //             userEmail.trim().toLowerCase()
    //           ) {
    //             console.log("Match found", user); // This should log if a match is found
    //             filteredData.push(user);
    //           }
    //         }
    //       });
    //     }

    // setData(filteredData);
    //     })
    //     .catch((error) => {
    //       console.error("Error fetching data:", error);
    //     });
  }, []);

  // console.log(data);

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
