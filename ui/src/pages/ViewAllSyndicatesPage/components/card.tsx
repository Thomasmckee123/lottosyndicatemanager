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

  return (
    <Card sx={{ width: "40vh", height: "60vh" }}>
      <CardMedia sx={{ height: 140 }} image={data.avatar} title={data.name} />
      <CardContent>
        <Typography
          variant="body2"
          color="text.tiertary"
          sx={{ fontSize: "0.8rem" }}
        >
          date: {data.createdDate}
        </Typography>
        <Typography
          gutterBottom
          component="div"
          sx={{
            fontSize: {
              xs: "0.5rem",
              sm: "0.8rem",
              md: "1rem",
              lg: "2rem",
              xl: "2.5rem",
            },
          }}
        >
          {data.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontSize: {
              xs: "0.5rem",
              sm: "0.8rem",
              md: "1rem",
              lg: "2rem",
              xl: "2.5rem",
            },
          }}
        >
          {data.description}
        </Typography>{" "}
        <CardActions sx={{ padding: 0, marginLeft: 0 }}>
          <Button
            size="small"
            sx={{
              fontSize: {
                xs: "0.5rem",
                sm: "0.8rem",
                md: "1rem",
                lg: "2rem",
                xl: "2.5rem",
              },
            }}
          >
            <Link
              to={NavigationRoutes.INSIDESYNDICATE.replace(
                ":syndicateId",
                `${data.id}`
              )}
            >
              View
            </Link>
          </Button>
          <Button
            size="small"
            sx={{
              fontSize: {
                xs: "0.5rem",
                sm: "0.8rem",
                md: "1rem",
                lg: "2rem",
                xl: "2.5rem",
              },
            }}
          >
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
