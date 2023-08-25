import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { S3Service } from '../services/s3';
import { EnvironmentCredentials, S3 } from 'aws-sdk';
import { SyndicateService } from '../services/syndicates';

const uploadImage = async (req: Request, res: Response) => {
  const {userId} = req.params;
  console.log("req",req);
  
  //@ts-ignore)
  const location = await S3Service.uploadImage(req.files!, userId);
  return res.status(StatusCodes.CREATED).json(location);
};

const uploadSyndicateImage = async (req: Request, res: Response) => {
  const {syndicateId} = req.params;
  console.log("req",req);
  
  //@ts-ignore)
  const [s3Response] = await S3Service.uploadSyndicateImage(req.files!, syndicateId);

   await SyndicateService.addSyndicateImage(Number(syndicateId), s3Response.location);

  return res.status(StatusCodes.CREATED).json(s3Response.location);
};


const s3 = new S3({
  credentials: new EnvironmentCredentials("AWS"),
  region: "YOUR_REGION",
});

// async function getImageUrlForSyndicate(syndicateId: number): Promise<string | null> {
//   const params = {
//       Bucket: 'lottosyndicatebucket',
//       Prefix: `syndicates/${syndicateId}/`
//   };

//   try {
//       const data = await s3.listObjectsV2(params).promise();

//       // Assuming there's only one image in the folder
//       if (data.Contents && data.Contents.length > 0) {
//           const imageUrl = `https://lottosyndicatebucket.s3.eu-west-1.amazonaws.com/${data.Contents[0].Key}`;
//           return imageUrl;
//       }
//   } catch (error) {
//       console.error("Error fetching image from S3:", error);
//   }

//   return null;
// }
const ImagesController = { uploadImage, uploadSyndicateImage };

export { ImagesController }; 