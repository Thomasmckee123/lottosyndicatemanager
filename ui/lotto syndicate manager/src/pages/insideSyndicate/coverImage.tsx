
        import * as React from 'react';
        import Card from '@mui/material/Card';
        import CardContent from '@mui/material/CardContent';
        import CardMedia from '@mui/material/CardMedia';
        import Typography from '@mui/material/Typography';
        import { Button, CardActionArea, CardActions } from '@mui/material';
        
        function CoverImage() {
          return (
            <Card sx={{ maxWidth: '100vw', backgroundColor: '#696969', color: 'white'}}>
              <CardActionArea>
                <CardMedia
            
                  component="img"
                  height="140"
                  image="/static/images/cards/contemplative-reptile.jpg"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    big Syndicate
                  </Typography>
                  <Typography variant="body2" color="white">
                    This is a fantastic syndicate to join, we allow a lot of new members, as long as you meet a particular criteria
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  request to join
                </Button>
                <Button size="small" color="primary">
                  reviews
                </Button>
              </CardActions>
            </Card>
          );
        }


export default CoverImage