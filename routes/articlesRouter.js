import express from 'express';
import * as controller from '../controllers/articlesController.js';
import { uploadArticleImage } from '../config/multerConfig.js';
import optionalVerifyJWT from '../middlewares/optionalVerifyJWT.js';

const router = express.Router();

router.get('/', optionalVerifyJWT, controller.getAllArticles);

router.get('/:id', controller.getArticleById);

router.post('/', uploadArticleImage.single('image'), controller.createArticleHandler)

export default router;