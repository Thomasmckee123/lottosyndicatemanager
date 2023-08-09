import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import fetchBoardsBySyndicateId from "../../services/board";
import { NavigationRoutes } from "../../constants";

function MessageBoardsPage() {
  const [data, setData] = useState<any>(null);
  const { syndicateId, user_syndicate_id } = useParams<{
    syndicateId: string;
    user_syndicate_id: string;
  }>();

  useEffect(() => {
    fetchBoardsBySyndicateId(Number(syndicateId))
      .then((response) => {
        console.log(response);
        setData(response);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [syndicateId]); // syndicateId added to dependency array

  return (
    <Box sx={{ flexGrow: 1, m: 3 }}>
      <Typography variant="h4" component="div" gutterBottom>
        Message Boards
      </Typography>
      <Grid container spacing={3}>
        {data &&
          data.map(
            (
              board: any // check if data is not null before mapping
            ) => (
              <Grid item xs={12} md={6} lg={4} key={board.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {board.name}
                    </Typography>

                    <Link
                      to={NavigationRoutes.BOARDCHAT.replace(
                        ":syndicateId",
                        `${syndicateId}`
                      )
                        .replace(":boardId", `${board.id}`)
                        .replace(
                          ":user_syndicate_id",
                          `${Number(user_syndicate_id)}`
                        )}
                    >
                      {" "}
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }} // adds top margin
                      >
                        Enter Board
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </Grid>
            )
          )}
      </Grid>
    </Box>
  );
}

export default MessageBoardsPage;
