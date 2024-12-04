import express from 'express';
import * as controller from '../controllers/articlesController.js';
import { uploadArticleImage } from '../configs/multerConfig.js';
import optionalVerifyJWT from '../middlewares/optionalVerifyJWT.js';

const router = express.Router();

router.get('/', optionalVerifyJWT, controller.getAllArticles);

router.post('/', uploadArticleImage.single('image'), controller.createArticleHandler)

export default router;