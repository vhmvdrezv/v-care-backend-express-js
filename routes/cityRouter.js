import express from 'express';
import * as controller from '../controllers/cityControllers.js';

const router = express.Router();

router.get('/', controller.getAllCities);

router.get("/:cityId", controller.getCityById);

export default router;