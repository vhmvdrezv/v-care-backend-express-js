import express from 'express';
import { refreshTokenHandler } from '../../controllers/usersControllers/refreshTokenController.js';

const router = express.Router();

router.get('/', refreshTokenHandler);

export default router;