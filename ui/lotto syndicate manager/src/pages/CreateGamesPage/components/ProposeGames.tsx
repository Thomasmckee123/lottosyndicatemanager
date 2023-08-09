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

function ProposeGames({ data }: { data: any }) {
  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: deepPurple[500] }}>TM</Avatar>}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={data.name}
        subheader="5 hours ago"
      />
      <CardMedia
        component="img"
        height="140"
        image={data.image}
        alt={data.name}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Draw date: {data.draw_date}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          proposed by: {data.user_syndicates.users.first_name}{" "}
          {data.user_syndicates.users.last_name}
        </Typography>
        <Button variant="contained" sx={{ backgroundColor: "darkred" }}>
          <Link
            component={RouterLink}
            to={NavigationRoutes.BOARDCHAT.replace(":gameId", `${data.id}`)}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            Play
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export default ProposeGames;
