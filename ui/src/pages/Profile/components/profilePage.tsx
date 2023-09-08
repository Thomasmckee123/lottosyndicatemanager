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
  CardMedia,
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
import { debug } from "console";
import { StyledPaper } from "../styled/styled";
import SyndicateCard from "./syndicates";

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

  const [capturedImage, setCapturedImage] = useState<File | null>(null);
  const captureImage = (): any => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      fetch(imageSrc)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], "profileImage.jpeg");
          setCapturedImage(file);
          handleFileUpload(file);
        });
    }
  };

  const handleTakePhoto = async () => {
    const imageSrc = captureImage();
    if (imageSrc) {
    }
  };

  const handleUpload = () => {
    uploadImage(userId, uploadedFile!);
    takeAPhoto(Number(userId));
    handleClose();
  };
  const handleDeleteSyndicate = (idToDelete: any) => {
    // Filter out the syndicate you want to delete
    const updatedData = syndicateData.filter(
      (syndicate) => syndicate.id !== idToDelete
    );
    setSyndicateData(updatedData);
  };
  return (
    <>
      <Card
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          boxShadow: " 0px 0px 10px black",
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: "20%", height: "20%", borderRadius: "50%" }}
          image={userData?.image}
          alt={userData?.name}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flexGrow: 1,
          }}
        >
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {`${userData.firstName} ${userData.lastName}`}
            </Typography>
            <Typography variant="h6" gutterBottom>
              {userData.email}
            </Typography>
            <Typography variant="h6" gutterBottom>
              {`Balance: ${userData.balance}`}
            </Typography>
          </CardContent>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <Button
              onClick={handleOpen}
              sx={{ backgroundColor: "darkred", color: "white" }}
            >
              Take a Photo
            </Button>
          </Box>
        </Box>
      </Card>

      <StyledPaper>
        {syndicateData.map((syndicate) => (
          <SyndicateCard
            propData={syndicate}
            onDelete={handleDeleteSyndicate}
          />
        ))}
      </StyledPaper>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Take a photo</DialogTitle>
        <DialogContent>
          {error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            <>
              <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                width="100%"
              />
            </>
          )}
          <Button onClick={handleUpload}> upload</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleTakePhoto} color="primary">
            Take Photo
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProfilePage;
