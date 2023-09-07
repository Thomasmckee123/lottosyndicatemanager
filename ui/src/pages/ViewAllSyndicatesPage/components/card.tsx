import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { NavigationRoutes } from "../../../constants/navigationRoutes";
import moment from "moment";

function MediaCard({ data }: { data: any }) {
  if (!data) return null;

  return (
    <Card sx={{ maxWidth: 345, margin: "5%" }}>
      <CardMedia
        component="img"
        height="140"
        image={data.avatar}
        alt={data.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Date: {moment(data.createdDate).format("D MMMM YYYY, h:mm:ss a")}
        </Typography>
      </CardContent>
      <CardActions>
        {" "}
        <Link
          to={NavigationRoutes.INSIDESYNDICATE.replace(
            ":syndicateId",
            `${data.id}`
          )}
        >
          <Button variant="contained" sx={{ backgroundColor: "darkred" }}>
            View
          </Button>
        </Link>
        <Link
          to={NavigationRoutes.REVIEW.replace(":syndicateId", `${data.id}`)}
        >
          {" "}
          <Button variant="contained" sx={{ backgroundColor: "darkred" }}>
            Reviews
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}

export default MediaCard;
