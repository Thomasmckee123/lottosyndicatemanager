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
  const { syndicateId } = useParams<{ syndicateId: string }>();

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
        await createUserSyndicate(
          new Date(),
          Number(userId),
          Number(syndicateId),
          Number(roleId)
        );
        setJoinedMessage("Successfully joined!");
      } else {
        setJoinedMessage("You have already joined");
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
        <Button size="small" color="primary" onClick={handleSubmit}>
          Request to Join
        </Button>
        <Typography variant="body2" color="red">
          {joinedMessage}
        </Typography>
        <Link
          to={NavigationRoutes.REVIEW.replace(`:syndicateId`, `${syndicateId}`)}
        >
          <Button size="small" color="primary">
            Reviews
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}

export default CoverImage;
