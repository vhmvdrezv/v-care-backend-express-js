import express from 'express';
import * as controller from '../controllers/cityControllers.js';

const router = express.Router();

router.get('/', controller.getAllCities);

export default router;