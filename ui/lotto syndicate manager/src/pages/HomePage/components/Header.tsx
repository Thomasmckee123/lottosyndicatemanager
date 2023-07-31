import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

function ButtonAppBar() {
  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '10vh',
    }}>
      <Box sx={{ 
        flexGrow: 1,
        maxWidth: '80vw',
      }}>
        <AppBar position="static" sx ={{backgroundColor: 'darkred'}}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
            
            </IconButton>
            <Typography variant="h6" gutterBottom>
                You're Syndicates
          </Typography>
            
          </Toolbar>
        </AppBar>
      </Box>
    </Box>
  );
}

export default ButtonAppBar;
