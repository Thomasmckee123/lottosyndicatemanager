// src/components/UserGames.tsx
import React from 'react';
import { Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';




import { useEffect, useState } from "react";
import { fetchUserGames } from '../../../services/userGames';
import TokenUtils from '../../../integrations/token';



const UserGames = () => {

    const [data, setData] = useState<any[]>([]);
    //const [games, setGames] = useState<any>();
  
      const jwt = TokenUtils.getJWT();
   
    
  
   console.log("JWT DATA",jwt)
    
    let  userId = jwt?.claims?.userId
    console.log("userId",userId)
   
      
    useEffect(() => {

 fetchUserGames(Number(userId))
        .then((response) => {
          console.log("RESPONSE", response)
         setData(response)
        
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, [userId]);
  console.log("GAMES ",data)
    // get user games by user id
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Your Games
      </Typography>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Game Name</TableCell>
              <TableCell align="right">Deposit Amount</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((game: any) => (
              <TableRow key={game?.id}>
                <TableCell component="th" scope="row">
                  {game?.games?.gameTypes?.name}
                </TableCell>
                <TableCell align="right">${game?.deposit}</TableCell>
                <TableCell align="right">
                  <Button variant="contained" color="primary">
                    Enter Chat
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default UserGames;
