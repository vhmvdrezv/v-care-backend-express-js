import express from 'express';
import * as controller from '../../controllers/usersControllers/otpController.js'

const router = express.Router();

router.post('/phone', controller.sendOtpHandler);

export default router;