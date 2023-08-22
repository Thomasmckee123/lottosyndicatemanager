import express from 'express';
import { ImagesController } from '../controllers/images'

const ImageRouter = express.Router();

ImageRouter.post('/:userId', ImagesController.uploadImage);

export { ImageRouter }; 