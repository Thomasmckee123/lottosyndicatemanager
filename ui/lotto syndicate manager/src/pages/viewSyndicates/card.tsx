import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import InsideSyndicate from "../insideSyndicate/InsideSyndicate";
import { NavigationRoutes } from "../../constants/navigation_routes";
type MediaCardProps = {
  id: number;
  data: {
    image: string;
    title: string;
    date: string;
    members: number;
    syndicateName: string;
    description: string;
  };
};
export const sampleData: MediaCardProps[] = [
  {
    id: 1,
    data: {
      image: "https://placekitten.com/200/300",
      title: "Cute Kitten",
      date: "2023-08-01",
      members: 100,
      syndicateName: "Kitten Lovers",
      description: "We are a syndicate of kitten enthusiasts.",
    },
  },

  {
    id: 2,
    data: {
      image: "https://placekitten.com/300/300",
      title: "Another Cute Kitten",
      date: "2023-07-01",
      members: 200,
      syndicateName: "More Kitten Lovers",
      description: "We are another syndicate of kitten enthusiasts.",
    },
  },
  {
    id: 3,
    data: {
      image: "https://placekitten.com/400/300",
      title: "Yet Another Cute Kitten",
      date: "2023-06-01",
      members: 300,
      syndicateName: "Even More Kitten Lovers",
      description: "Yet another syndicate of kitten enthusiasts.",
    },
  },
];

function MediaCard({ id, data }: MediaCardProps) {
  React.useEffect(() => {
    {
    }
  });
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 140 }} image={data.image} title={data.title} />
      <CardContent>
        <Typography variant="body2" color="text.tiertary">
          {" "}
          date:{data.date}
        </Typography>
        <Typography variant="body2" color="text.tiertary">
          {" "}
          members: {data.members}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {data.syndicateName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
          <Link to={NavigationRoutes.INSIDESYNDICATE}>View</Link>
        </Button>
        <Button size="small">
          <Link to={NavigationRoutes.REVIEW}>reviews</Link>
        </Button>
      </CardActions>
    </Card>
  );
}

export default MediaCard;
