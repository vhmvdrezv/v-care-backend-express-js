import express from 'express';
import * as controller from '../controllers/TimeSlotsController.js';

const router = express.Router();

router.get('/', controller.getAllTimeSlots);

export default router;