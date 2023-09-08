import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArchiveIcon from "@mui/icons-material/Archive";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import { useEffect, useState } from "react";
import { fetchReviewsBySyndicateId } from "../../../services/reviews";
import { useParams } from "react-router-dom";

function ReviewMessages() {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const { syndicateId } = useParams<{ syndicateId: string }>();

  useEffect(() => {
    fetchReviewsBySyndicateId(Number(syndicateId))
      .then((response) => {
        setMessages(response);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  }, []);

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      <List>
        {messages.map((item, index) => (
          <ListItem button key={index + item?.users?.firstName}>
            <ListItemAvatar>
              <Avatar alt="Profile Picture" src={""} />
            </ListItemAvatar>
            <ListItemText primary={item?.title} secondary={item?.content} />
            <ListItemText />
          </ListItem>
        ))}
      </List>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Archive" icon={<ArchiveIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

export default ReviewMessages;
