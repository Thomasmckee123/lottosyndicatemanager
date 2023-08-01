import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import fetchData from "./fetchInsideSyndicateData"; // Import the fetchData function
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CoverImage() {
  const [data, setData] = useState<any>(null); // Use useState to manage the data state
  const { syndicateId } = useParams<{ syndicateId: string }>();
  console.log(syndicateId);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData(Number(syndicateId))
      .then((response) => {
        console.log(response);
        setData(response);

        console.log(response);

        // Assuming you want to use the first item from the response
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  console.log(data);
  // Check if data is still null after fetching
  if (!data) {
    return <div>Data not available.</div>;
  }
  console.log(data.name);
  console.log(data.description);
  return (
    <Card
      sx={{ maxWidth: "100vw", backgroundColor: "#696969", color: "white" }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={data.avatar}
          alt={data.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" color={"white"}>
            {data.name}
          </Typography>
          <Typography variant="body2" color="white">
            {data.description}
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

export default CoverImage;
