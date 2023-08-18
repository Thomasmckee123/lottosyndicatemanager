import React, { useState } from 'react';
import { Typography, Button, Paper, List, ListItem, Container } from '@mui/material';

interface Props {}

interface BallSelection {
  ballNumber: number;
  selectedNumbers: number[];
}

const SelectedNumbers: React.FC<Props> = () => {
  const [groupSelections, setGroupSelections] = useState<BallSelection[]>([]);

  // For demonstration
  const addDummyData = () => {
    setGroupSelections([
      { ballNumber: 1, selectedNumbers: [4, 23, 56] },
      { ballNumber: 2, selectedNumbers: [7, 12, 42, 68] },
      { ballNumber: 3, selectedNumbers: [9, 14, 48, 57, 85] }
    ]);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Selected Numbers
      </Typography>

      <Button variant="contained" color="primary" onClick={addDummyData} style={{ marginBottom: '20px' }}>
        Load Dummy Data
      </Button>

      {groupSelections.map((selection) => (
        <Paper key={selection.ballNumber} style={{ padding: '20px', marginBottom: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Ball {selection.ballNumber}
          </Typography>
          <List>
            {selection.selectedNumbers.map((num) => (
              <ListItem key={num}>
                <Typography variant="body1">{num}</Typography>
              </ListItem>
            ))}
          </List>
        </Paper>
      ))}
    </Container>
  );
}

export default SelectedNumbers;
