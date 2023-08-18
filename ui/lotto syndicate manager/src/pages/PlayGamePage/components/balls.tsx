import React, { useEffect, useState } from 'react';
import { Typography, Button, Paper, List, ListItem, Container } from '@mui/material';
import { getTicketsByGameId } from '../../../services/ticket';


const SelectedNumbers:any = ({gameId}: any) => {


const [data, setData] = useState<any>([]);

useEffect(()=>{
    console.log(gameId)
    getTicketsByGameId(Number(gameId)).then((response)=>setData(Array(response)));
    
    }, [gameId])

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Selected Numbers
      </Typography>

      
      {data.map((item: any) => (
        <Paper key={item?.TicketCode} style={{ padding: '20px', marginBottom: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Ball {item?.ticketCode}
          </Typography>
          <List>
          
              <ListItem key={item?.id}>
                <Typography variant="body1">{item?.games?.gameTypes?.name}</Typography>
              </ListItem>
            
          </List>
        </Paper>
      ))}
    </Container>
  );
}

export default SelectedNumbers;
