import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Button,
  Box,
  Divider,
} from "@mui/material";
import { fetchUserGamesByGameId } from "../../../services/userGames";
import { Link, useParams } from "react-router-dom";
import { NavigationRoutes } from "../../../constants";
import { StyledPaperTop } from "../styles/styled";

const Members = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    fetchUserGamesByGameId(Number(gameId)).then((response) => {
      setUsers(response);
    });
  }, [gameId]);

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <StyledPaperTop>
        <Typography variant="h4" gutterBottom sx={{ color: "white" }}>
          Members
        </Typography>
      </StyledPaperTop>
      <List sx={{ width: "100%", height: "100%" }}>
        {users.map((member, index) => (
          <React.Fragment key={member.id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar src={member.users.image} alt={member.users.firstName} />
              </ListItemAvatar>
              <ListItemText
                primary={`${member.users.firstName} ${member.users.lastName}`}
                secondary={
                  <>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {member.users.email}
                    </Typography>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.secondary"
                    >
                      {" - Balance: "}
                      {member.users.balance}
                    </Typography>
                  </>
                }
              />
              <Button variant="contained" color="primary">
                View Profile
              </Button>
            </ListItem>
            {index !== users.length - 1 && (
              <Divider variant="inset" component="li" />
            )}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default Members;
