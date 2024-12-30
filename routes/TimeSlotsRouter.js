import express from 'express';
import * as controller from '../controllers/TimeSlotsController.js';
import verifyJWT from '../middlewares/verifyJWT.js';

const router = express.Router();

router.get('/', controller.getAllTimeSlots);

router.patch('/:timeSlotId/reserve', /*verifyJWT,*/ controller.reserveTimeSlot)

export default router;