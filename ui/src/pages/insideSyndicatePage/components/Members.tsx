import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

function Members({ data }: { data: any }) {
  return (
    <Box sx={{ minWidth: 275, backgroundColor: "darkRed" }}>
      <Card variant="outlined" sx={{ backgroundColor: "#696969" }}>
        <CardContent sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src={data.users.image}
            alt={`${data.users.firstName} ${data.users.lastName}`}
            sx={{ width: 56, height: 56, mr: 2 }}
          />
          <Box>
            <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
              {`${data.users.firstName} ${data.users.lastName}`}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="white">
              Role: {data.roles.name}
            </Typography>
            <Typography variant="body2" color="white">
              Start Date: {data.startDate}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Members;
