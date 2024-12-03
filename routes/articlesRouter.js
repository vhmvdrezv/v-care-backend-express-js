import express from 'express';
import * as controller from '../controllers/articlesController.js';
import { uploadArticleImage } from '../configs/multerConfig.js';

const router = express.Router();

router.get('/', controller.getAllArticles);

router.post('/', uploadArticleImage.single('image'), controller.createArticleHandler)

export default router;