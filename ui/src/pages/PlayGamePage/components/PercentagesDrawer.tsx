import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { PieChart } from "@mui/x-charts/PieChart";
import Typography from "@mui/material/Typography";

const buttonToAnchorMap = {
  "Deposit Percentages": "right",
  stats: "left",
} as const;
type Anchor = "right" | "left";

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
        sx={{ width: 250 }}
        role="presentation"
        onClick={toggleDrawer(buttonName, false)}
        onKeyDown={toggleDrawer(buttonName, false)}
      >
        {buttonName === "stats" && (
          <>
            <Typography variant="h6" component="div" sx={{ padding: "16px" }}>
              Deposit Percentages
            </Typography>
            <Button onClick={toggleDrawer(buttonName, false)}>Go Back</Button>
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
              }}
            />
            <Box sx={{ marginTop: "16px" }}>
              <Typography variant="h6">User Details:</Typography>
              {calculatedPercentages.map((user, index) => (
                <Typography key={index}>{user.label}</Typography>
              ))}
            </Box>
          </>
        )}
      </Box>
    );
  };

  return (
    <div>
      {Object.keys(buttonToAnchorMap).map((buttonName) => (
        <React.Fragment key={buttonName}>
          <Button onClick={toggleDrawer(buttonName, true)}>{buttonName}</Button>
          <Drawer
            anchor={
              buttonToAnchorMap[buttonName as keyof typeof buttonToAnchorMap]
            }
            open={state[buttonName]}
            onClose={toggleDrawer(buttonName, false)}
          >
            {list(buttonName)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export default PercentagesDrawer;
