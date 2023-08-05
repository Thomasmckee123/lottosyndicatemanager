import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import fetchGamesBySyndicateId from "../../utils/games";

interface MediaProps {
  loading?: boolean;
}

function Media({ data }: { data: any }) {
  return (
    <Grid container wrap="wrap" sx={{ width: "100vw" }}>
      <Box sx={{ width: 210, marginRight: 0.5, my: 5 }}>
        <img
          style={{ width: 210, height: 118 }}
          alt={data?.name}
          src={data?.image}
        />

        <Skeleton variant="rectangular" width={"30vw"} height={118} />

        <Box sx={{ pr: 2 }}>
          <Typography gutterBottom variant="body2">
            {data?.first_name} {data?.last_name}
          </Typography>
          <Typography display="block" variant="caption" color="text.secondary">
            {data?.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {`${data?.required_ticket_number} • ${data?.draw_date}`}
          </Typography>
        </Box>

        <Box sx={{ pt: 0.5 }}>
          <Skeleton />
          <Skeleton width="100%" />
        </Box>
      </Box>
    </Grid>
  );
}

function BottomDisplay() {
  const { syndicateId } = useParams<{ syndicateId: string }>();
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    fetchGamesBySyndicateId(Number(syndicateId))
      .then((response) => {
        setData(response[0]);
        if (Array.isArray(response)) {
          setData(response);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <>
      <Typography variant="h2" gutterBottom>
        Games
      </Typography>

      <Box sx={{ overflow: "hidden" }}>
        {data.map((item) => (
          <Media data={item} />
        ))}
      </Box>
    </>
  );
}
export default BottomDisplay;
