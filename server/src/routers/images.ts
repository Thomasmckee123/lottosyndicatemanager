import express from 'express';
import { ImagesController } from '../controllers/images'

const ImageRouter = express.Router();

ImageRouter.post('/:userId', ImagesController.uploadImage);
ImageRouter.post('/syndicates/:syndicateId', ImagesController.uploadSyndicateImage);

export { ImageRouter }; 