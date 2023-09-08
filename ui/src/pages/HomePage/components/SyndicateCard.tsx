import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";

import { Link } from "react-router-dom";
import { NavigationRoutes } from "../../../constants";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteUserSyndicateBySyndicateId } from "../../../services/members";
import { useState } from "react";

import MuiAlert, { AlertProps } from "@mui/material/Alert";

import TokenUtils from "../../../integrations/token";
import { StyledCardHeader } from "../styles/styled";
import moment from "moment";
function SyndicateCard({
  role,
  propData,
  onDelete,
}: {
  role: number;
  propData: any;
  onDelete: Function;
}) {
  function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const jwt = TokenUtils.getJWT();
  const userId = jwt.claims.userId;
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<any>(propData);

  const handleLeaveSyndicate = () => {
    deleteUserSyndicateBySyndicateId(data.id).then((response) => {
      setOpen(true);
      onDelete(data.id);
    });
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Card
      sx={{
        maxWidth: 345,
        boxShadow: "0px 0px 20px black",
        marginBottom: "2%",
      }}
    >
      <StyledCardHeader
        avatar={
          role !== 2 && (
            <IconButton onClick={handleLeaveSyndicate}>
              <DeleteIcon sx={{ color: "white" }} />
            </IconButton>
          )
        }
        title={
          <Typography variant="h6" component="div">
            {data?.syndicates.name}
          </Typography>
        }
        subheader={
          <Typography variant="subtitle2" color="white">
            {moment(data.syndicates.createdDate).format("DD/MM/YYYY")}
          </Typography>
        }
      />
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          {data.syndicates.description}
        </Typography>
        <img
          src={data.syndicates.avatar || "https://via.placeholder.com/150"}
          alt={data.syndicates.name}
          style={{ width: "300px", height: "300px" }}
        />
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "darkRed",
            textDecoration: "none",
            color: "white",
            width: "100%",
          }}
        >
          <Link
            to={NavigationRoutes.SYNDICATEBOARDS.replace(
              ":syndicateId",
              `${data.syndicates.id}`
            ).replace(":userSyndicateId", `${data.id}`)}
            style={{ color: "inherit", textDecoration: "none", width: "100%" }}
          >
            {role === 2 ? "Manage Syndicate" : "Enter"}
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
}

export default SyndicateCard;
