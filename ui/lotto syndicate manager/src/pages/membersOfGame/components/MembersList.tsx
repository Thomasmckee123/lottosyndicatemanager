import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Container,
  Grid,
  Avatar,
  Button,
} from "@mui/material";
import { fetchUserGamesByGameId } from "../../../services/userGames";
import { useParams } from "react-router-dom";

const Members = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    fetchUserGamesByGameId(Number(gameId)).then((response) => {
      setUsers(response);
    });
  }, [gameId]);

  return (
    <>
      <Button variant="contained" color="primary">
        back to game
      </Button>
      <Container>
        {" "}
        <Typography variant="h4" gutterBottom>
          Members
        </Typography>
        <Grid container spacing={3}>
          {users.map((member) => (
            <Grid item xs={12} sm={6} md={4} key={member.id}>
              <Card>
                <CardHeader
                  avatar={
                    <Avatar
                      src={member.users.image}
                      alt={member.users.firstName}
                    />
                  }
                  title={`${member.users.firstName} ${member.users.lastName}`}
                  subheader={member.users.email}
                />
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Balance: {member.users.balance}
                  </Typography>
                </CardContent>
                <Button variant="contained" color="primary">
                  View Profile
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Members;
