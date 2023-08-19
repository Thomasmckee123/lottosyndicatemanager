import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Paper,
  List,
  ListItem,
  Container,
} from "@mui/material";
import { getTicketsByGameId } from "../../../services/tickets";

const SelectedNumbers: any = ({ gameId }: any) => {
  const [data, setData] = useState<any>([]);
  const getTicketData = async () => {
    try {
      let response = await getTicketsByGameId(Number(gameId));
      console.log("API Response:", response);
      setData(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getTicketData();
  }, [gameId]);
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Selected Numbers
      </Typography>

      {data.map((item: any) => (
        <Paper
          key={item?.ticketCode}
          style={{ padding: "20px", marginBottom: "20px" }}
        >
          <Typography variant="h6" gutterBottom>
            Ball {item?.ticketCode}
          </Typography>
          <List>
            <ListItem key={item?.id}>
              <Typography variant="body1">
                {item?.games?.gameTypes?.name}
              </Typography>
            </ListItem>
          </List>
        </Paper>
      ))}
    </Container>
  );
};

export default SelectedNumbers;
