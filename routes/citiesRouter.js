import express from 'express';
import * as controller from '../controllers/citiesControllers.js'

const router = express.Router();

router.get("/", controller.getAllCities);

router.post('/', controller.addCityHandler);

export default router;