import React, { useState, useEffect } from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import {
  createUserSyndicate,
  fetchAllSyndicateData,
  fetchHomePageSyndicateData,
  fetchInsideUserSyndicateData,
} from "../../../services/syndicates";
import TokenUtils from "../../../integrations/token";
import { NavigationRoutes } from "../../../constants";

function CoverImage() {
  const roleId = 2;
  const jwt = TokenUtils.getJWT();
  const userId = jwt.claims.userId;

  const [data, setData] = useState<any>(null);
  const [joinedMessage, setJoinedMessage] = useState("");
  const [joined, setJoined] = useState<boolean>(false);
  const { syndicateId } = useParams<{ syndicateId: string }>();
  const [userSyndicateId, setUserSyndicateId] = useState<number>();
  const userSyndicateCheck = async () => {
    try {
      const firstresponse = await fetchHomePageSyndicateData(Number(userId));
      console.log("FIRST RESPONSE: ", firstresponse);
      const targetSyndicate = firstresponse.find(
        (synd: any) =>
          synd.syndicates.id == syndicateId && synd.users.id == userId
      );
      console.log("TARGET SYNDICATE:", targetSyndicate);
      if (targetSyndicate) {
        setUserSyndicateId(targetSyndicate.syndicates.id);
        return true;
      }
    } catch (error) {
      console.error("Error checking user syndicate:", error);
      return false;
    }
  };

  const handleSubmit = async () => {
    try {
      const isUserMember = await userSyndicateCheck();
      if (!isUserMember) {
        let response = await createUserSyndicate(
          new Date(),
          Number(userId),
          Number(syndicateId),
          Number(roleId)
        );
        setJoinedMessage("Successfully joined!");
        setJoined(true);
      } else {
        setJoinedMessage("You have already joined");
        setJoined(true);
      }
    } catch (error) {
      console.error("Error handling submit:", error);
      setJoinedMessage("Error joining the syndicate. Please try again later.");
    }
  };
  useEffect(() => {
    fetchAllSyndicateData();
  });
  useEffect(() => {
    fetchInsideUserSyndicateData(Number(syndicateId))
      .then((response) => setData(response))
      .catch((error) => console.error("Error fetching syndicate data:", error));
  }, [syndicateId]);

  return (
    <Card
      sx={{ maxWidth: "100vw", backgroundColor: "#696969", color: "white" }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={data?.avatar}
          alt={data?.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" color={"white"}>
            {data?.name}
          </Typography>
          <Typography variant="body2" color="white">
            {data?.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          variant="contained"
          sx={{ backgroundColor: "darkred" }}
          color="primary"
          onClick={handleSubmit}
          disabled={joined}
        >
          {joined ? "You have already joined" : "Request to Join"}
        </Button>
        {joined && (
          <Button
            variant="contained"
            sx={{ backgroundColor: "darkred" }}
            color="primary"
            component={Link}
            to={NavigationRoutes.SYNDICATEBOARDS.replace(
              `:syndicateId`,
              `${syndicateId}`
            ).replace(`:userSyndicateId`, `${userSyndicateId}`)}
          >
            Enter Syndicate
          </Button>
        )}

        <Link
          to={NavigationRoutes.REVIEW.replace(`:syndicateId`, `${syndicateId}`)}
        >
          <Button
            variant="contained"
            size="small"
            color="primary"
            sx={{ backgroundColor: "darkred" }}
          >
            Reviews
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}

export default CoverImage;
