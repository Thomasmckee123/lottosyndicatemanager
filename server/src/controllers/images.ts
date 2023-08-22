import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { S3Service } from '../services/s3';

const uploadImage = async (req: Request, res: Response) => {
  const {userId} = req.params;
  console.log("req",req);
  
  //@ts-ignore)
  const location = await S3Service.uploadImage(req.files!, userId);
  return res.status(StatusCodes.CREATED).json(location);
};

const ImagesController = { uploadImage };

export { ImagesController }; 