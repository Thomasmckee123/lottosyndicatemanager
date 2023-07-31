import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { deepPurple } from "@mui/material/colors";
import { Button, Link } from "@mui/material";
import { NavigationRoutes } from "../../../constants";
import { Link as RouterLink } from "react-router-dom";

function Media() {
  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: deepPurple[500] }}>TM</Avatar>}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Euromillions"
        subheader="5 hours ago"
      />
      <CardMedia
        component="img"
        height="140"
        image="data:image/png;base64,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"
        alt="euromillions"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Draw result: 15, 27, 34, 38, 49 - Lucky Stars: 2, 10.
        </Typography>
        <Button variant="contained" sx={{ backgroundColor: "darkred" }}>
          <Link
            component={RouterLink}
            to={NavigationRoutes.BOARDCHAT}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            Play
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export default Media;
