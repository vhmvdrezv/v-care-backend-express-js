import express from 'express';
import * as controller from '../controllers/uploadArticleImageBodyControllers.js'
import { uploadArticleImageBody } from '../configs/multerConfig.js';

const router = express.Router();

router.post('/', uploadArticleImageBody.single('image'), controller.uploadArticleImageBodyController);

export default router;
