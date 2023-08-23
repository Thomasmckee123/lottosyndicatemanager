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

function SyndicateCard({ data }: { data: any }) {
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
        title={
          <Typography variant="h6" component="div">
            {data.syndicates.name}
          </Typography>
        }
        subheader={
          <Typography variant="subtitle2" color="text.secondary">
            {data.syndicates.createdDate}
          </Typography>
        }
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {data.syndicates.description}
        </Typography>
        <img
          src={data.syndicates.avatar || "https://via.placeholder.com/150"}
          alt={data.syndicates.name}
          style={{ width: "300px", height: "300px" }}
        />
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "darkRed",
            textDecoration: "none",
            color: "white",
            width: "100%",
          }}
        >
          <Link
            to={NavigationRoutes.SYNDICATEBOARDS.replace(
              ":syndicateId",
              `${data.syndicates.id}`
            ).replace(":userSyndicateId", `${data.id}`)}
            style={{ color: "inherit", textDecoration: "none", width: "100%" }}
          >
            Enter
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
}

export default SyndicateCard;
