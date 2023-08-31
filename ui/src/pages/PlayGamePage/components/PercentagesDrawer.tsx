/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { PieChart } from "@mui/x-charts/PieChart";
import Typography from "@mui/material/Typography";
import Members from "./membersList";
import { StyledPaperTop } from "../styles/styled";
import { color } from "@mui/system";

const buttonToAnchorMap = {
  members: "right",
  stats: "left",
} as const;

function PercentagesDrawer({ userData }: { userData: any[] }) {
  const [state, setState] = React.useState<Record<string, boolean>>({
    stats: false,
    members: false,
  });

  // Calculate deposit percentages
  const calculatePercentages = () => {
    console.log("MAPPED USER DATA FOR SPLITTING BILL", userData);
    return userData.map((user, index) => {
      console.log("USER DEPOSIT", user.deposit);

      const depositPercentage = //@ts-ignore
        (Number(user?.deposit) / Number(user?.games?.treasury)) * 100;
      const name = user?.users?.firstName && user?.users?.lastName;
      return {
        id: index,
        value: depositPercentage,
        label: `${name} (${depositPercentage.toFixed(2)}%)`,
      };
    });
  };
  console.log("CALCULATED PERCENTAGES", calculatePercentages());
  const toggleDrawer =
    (buttonName: string, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [buttonName]: open });
    };

  const list = (buttonName: string) => {
    const calculatedPercentages = calculatePercentages();
    return (
      <Box
        sx={{ width: 550, backgroundColor: "darkgray", color: "white" }}
        role="presentation"
        onClick={toggleDrawer(buttonName, false)}
        onKeyDown={toggleDrawer(buttonName, false)}
      >
        {buttonName === "stats" && (
          <>
            <StyledPaperTop>
              <Typography
                variant="h6"
                component="div"
                sx={{ padding: "16px", color: "white" }}
              >
                Contributions
              </Typography>
            </StyledPaperTop>
            <Button
              sx={{ color: "darkRed" }}
              onClick={toggleDrawer(buttonName, false)}
            >
              Go Back
            </Button>
            <PieChart
              series={[
                {
                  data: calculatedPercentages,
                },
              ]}
              width={400}
              height={200}
              sx={{
                zIndex: 1002,
                color: "white",
              }}
            />
            <Box sx={{ marginTop: "16px", color: "white" }}>
              <Typography variant="h6">User Details:</Typography>
              {calculatedPercentages.map((user, index) => (
                <Typography key={index}>{user.label}</Typography>
              ))}
            </Box>
          </>
        )}
        {buttonName === "members" && (
          <>
            <Members />
            <Button
              sx={{ color: "red" }}
              onClick={toggleDrawer(buttonName, false)}
            >
              Go Back
            </Button>
          </>
        )}
      </Box>
    );
  };

  return (
    <Box>
      {Object.keys(buttonToAnchorMap).map((buttonName) => (
        <React.Fragment key={buttonName}>
          <Button
            sx={{ color: "white" }}
            onClick={toggleDrawer(buttonName, true)}
          >
            {buttonName}
          </Button>
          <Drawer
            anchor={
              buttonToAnchorMap[buttonName as keyof typeof buttonToAnchorMap]
            }
            open={state[buttonName]}
            onClose={toggleDrawer(buttonName, false)}
            sx={{ backgroundColor: "grey" }}
          >
            {list(buttonName)}
          </Drawer>
        </React.Fragment>
      ))}
    </Box>
  );
}

export default PercentagesDrawer;
