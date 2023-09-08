import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
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

function SyndicateCard({
  propData,
  onDelete,
}: {
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
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <IconButton onClick={handleLeaveSyndicate}>
            <DeleteIcon />
          </IconButton>
        }
        title={
          <Typography variant="h6" component="div">
            {data?.syndicates.name}
          </Typography>
        }
        subheader={
          <Typography variant="subtitle2" color="text.secondary">
            {data.syndicates.createdDate}
          </Typography>
        }
      />
      <CardContent>
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
            Enter
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
}

export default SyndicateCard;
