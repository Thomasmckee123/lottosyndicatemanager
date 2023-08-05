import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const card = (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
        Thomas Mckee
      </Typography>

      <Typography sx={{ mb: 1.5 }} color="white">
        role : member
      </Typography>
      <Typography variant="body2" color="white">
        start date : 2020/01/02
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">view</Button>
    </CardActions>
  </React.Fragment>
);

function NameCard({ data }: { data: any }) {
  return (
    <>
      <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined" sx={{ backgroundColor: "#696969" }}>
          <React.Fragment>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
                {data.users.first_name}
              </Typography>

              <Typography sx={{ mb: 1.5 }} color="white">
                role : {data.roles.name}
              </Typography>
              <Typography variant="body2" color="white">
                start date : {data.start_date}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">view</Button>
            </CardActions>
          </React.Fragment>
        </Card>
      </Box>
    </>
  );
}
export default NameCard;
