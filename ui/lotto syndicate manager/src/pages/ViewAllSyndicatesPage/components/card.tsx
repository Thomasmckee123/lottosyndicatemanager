import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { NavigationRoutes } from "../../../constants/navigationRoutes";

function MediaCard({ data }: { data: any }) {
  if (!data) return null;

  // Set a fallback image URL when 'avatar' is not available
  const fallbackImage = "fallback_image.jpg";

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={data.avatar || fallbackImage}
        title={data.name}
      />
      <CardContent>
        <Typography variant="body2" color="text.tiertary">
          date: {data.createdDate}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {data.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
          <Link
            to={NavigationRoutes.INSIDESYNDICATE.replace(
              ":syndicateId",
              `${data.id}`
            )}
          >
            View
          </Link>
        </Button>
        <Button size="small">
          <Link
            to={NavigationRoutes.REVIEW.replace(":syndicateId", `${data.id}`)}
          >
            reviews
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
}

export default MediaCard;
