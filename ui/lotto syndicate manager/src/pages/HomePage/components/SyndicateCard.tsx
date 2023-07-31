import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import Button from "@mui/material/Button";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
import { NavigationRoutes } from "../../../constants";

function SyndicateCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="syndicate">
            S
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Lucky Seven Lottery Syndicate"
        subheader="Active since April 2022"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Join our Lucky Seven Lottery Syndicate and increase your chances to
          win! We pool our resources to buy more tickets and share the winnings.
          Join us now!
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "darkRed",
            textDecoration: "none",
            color: "white",
          }}
        >
          <Link
            to={NavigationRoutes.JOINGAME}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            {" "}
            Enter{" "}
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
}

export default SyndicateCard;
