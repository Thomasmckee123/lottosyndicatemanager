import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { fetchGamesWePlay } from "../../../services/gameTypes";
import CountDown from "../../../components/countdown";

function GameCard({ data }: { data: any }) {
  const displayDate = new Date(Date.parse(data.drawDate)).toLocaleDateString();

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card sx={{ maxWidth: 345, m: 2 }}>
        <CardMedia
          component="img"
          height="300"
          image={data?.image}
          alt={data?.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data?.firstName} {data?.lastName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ticket Cost: £ {data?.ticketCost}
          </Typography>
          <CountDown drawDate={data.drawDate} gameId={data.id} />
        </CardContent>
      </Card>
    </Grid>
  );
}

function BottomDisplay() {
  const { syndicateId } = useParams<{ syndicateId: string }>();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetchGamesWePlay()
      .then((response) => {
        if (Array.isArray(response)) {
          setData(response);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [syndicateId]);

  return (
    <div>
      <Typography variant="h2" gutterBottom>
        Games
      </Typography>

      <Grid container spacing={3}>
        {data.map((item) => (
          <GameCard key={item.id} data={item} />
        ))}
      </Grid>
    </div>
  );
}

export default BottomDisplay;
