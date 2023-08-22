import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  CardContent,
  Grid,
  Box,
  Avatar,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import TokenUtils from "../../../integrations/token";
import { fetchHomePageSyndicateData } from "../../../services/syndicates";
import {
  fetchProfileData,
  takeAPhoto,
  uploadImage,
} from "../../../services/profile";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

import Webcam from "react-webcam";
import FileUpload from "../../../services/fileUpload";

const ProfilePage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>({});
  const [syndicateData, setSyndicateData] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const jwt = TokenUtils.getJWT();
  const userId = jwt.claims.userId;
  const webcamRef = useRef<Webcam & HTMLVideoElement>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  useEffect(() => {
    fetchProfileData(userId)
      .then((response) => {
        setUserData(response);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });

    fetchHomePageSyndicateData(userId)
      .then((response) => {
        setSyndicateData(response);
      })
      .catch((error) => {
        console.error("Error fetching syndicate data:", error);
      });
  }, [userId]);
  const capture = (): any => {
    const imageSrc = webcamRef.current?.getScreenshot();
    return imageSrc;
  };
  const handleTakePhoto = async () => {
    const imageSrc = capture();
    if (imageSrc) {
      takeAPhoto(userId, imageSrc);
    }
  };
  const handleOpen = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        setStream(stream);
        setOpen(true);
      })
      .catch((error) => {
        console.error("Error getting user media:", error);
        setError("Error getting user media");
      });
  };

  const handleClose = () => {
    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop();
      });
      setStream(null);
    }
    setOpen(false);
  };

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
  };
  const handleUpload = () => {
    uploadImage(userId, uploadedFile!);
  };
  return (
    <div>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Box display="flex" justifyContent="center">
                <Avatar
                  alt={`${userData.firstName} ${userData.lastName}`}
                  src={userData.image}
                />
              </Box>
              <Box display="flex" justifyContent="center">
                <IconButton onClick={handleOpen}>
                  <AddPhotoAlternateIcon />
                </IconButton>
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h4" gutterBottom>
                {`${userData.firstName} ${userData.lastName}`}
                {userData.image}
              </Typography>
              <Typography variant="h6" gutterBottom>
                {userData.email}
              </Typography>
              <Typography variant="h6" gutterBottom>
                {`Balance: ${userData.balance}`}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {syndicateData.map((syndicate) => (
          <Card key={syndicate.id} style={{ margin: "10px" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {syndicate.syndicates.name}
              </Typography>
              <Typography variant="h6" gutterBottom>
                {`Role: ${syndicate.roles.name}`}
              </Typography>
              <Typography variant="h6" gutterBottom>
                {`Start Date: ${syndicate.startDate}`}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Take a photo</DialogTitle>
        <DialogContent>
          {error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              width="100%"
            />
          )}
          <FileUpload onUpload={handleFileUpload} />
          <Button onClick={handleUpload}> upload</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpload} color="primary">
            Take Photo
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProfilePage;
