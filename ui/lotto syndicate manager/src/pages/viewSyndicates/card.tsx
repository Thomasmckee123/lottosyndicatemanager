import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import InsideSyndicate from "../insideSyndicate/InsideSyndicate";

function MediaCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography variant="body2" color="text.tiertary">
          {" "}
          date: 09/10/2020{" "}
        </Typography>
        <Typography variant="body2" color="text.tiertary">
          {" "}
          members: 100{" "}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          Cool Syndicate
        </Typography>
        <Typography variant="body2" color="text.secondary">
          We are the top syndicate in this country
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
          <Link to="/InsideSyndicate">View</Link>
        </Button>
        <Button size="small">
          <Link to="/review">reviews</Link>
        </Button>
      </CardActions>
    </Card>
  );
}

export default MediaCard;
