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
    <Card
      sx={{ width: "40vh", height: "40vh", margin: "2vh", overflow: "auto" }}
    >
      <CardMedia sx={{ height: 140 }} image={data.avatar} title={data.name} />
      <CardContent sx={{ height: "100%", width: "100%" }}>
        <Typography variant="body2" color="text.tiertary">
          date: {moment(data.createdDate).format("D MMMM YYYY, h:mm:ss a")}
        </Typography>
        <Typography gutterBottom component="div">
          {data.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data.description}
        </Typography>{" "}
        <CardActions sx={{ padding: 0, marginLeft: 0 }}>
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
      </CardContent>
    </Card>
  );
}

export default MediaCard;
