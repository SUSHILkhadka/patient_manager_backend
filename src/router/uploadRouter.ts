import { NextFunction, Response, Router } from 'express';
import fs from 'fs';
import { StatusCodes } from 'http-status-codes';
import cloudinary from '../config/cloudinary';
import upload from '../config/multer';
import CustomError from '../misc/CustomError';
import logger from '../misc/Logger';

const router = Router();
router.post('/', upload.array('keyForFileObject'), uploadFiles);

/**
 *
 * @param req user's request with files
 * @param res response of server
 * @param next next function
 * @returns url of file after uploading to cloud and deleting local file.
 */
async function uploadFiles(req: any, res: Response, next: NextFunction) {
  try {
    const filePath = req.files[0].path;
    const fileType = req.files[0].mimetype.split('/')[0];
    if (fileType != 'image') {
      throw 'Invalid file type for uploading File should be image';
    }
    logger.info('uploading file');
    const uploadResponse = await cloudinary.uploader.upload(filePath, {
      upload_preset: 'contacts-photo',
    });
    logger.info('successfully uploaded image to cloudinary');
    fs.unlinkSync(filePath);
    return res.json({ url: uploadResponse.url });
  } catch (e) {
    fs.unlinkSync(req.files[0].path);
    return next(new CustomError(`${e}`, StatusCodes.INTERNAL_SERVER_ERROR));
  }
}

export default router;
