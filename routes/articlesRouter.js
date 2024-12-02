import express from 'express';
import * as controller from '../controllers/articlesController.js';

const router = express.Router();

router.get('/', controller.getAllArticles);

router.post('/')

export default router;