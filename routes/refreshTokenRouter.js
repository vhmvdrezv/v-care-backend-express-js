import express from 'express';
import { refreshTokenHandler } from '../controllers/refreshTokenController.js';

const router = express.Router();

router.get('/', refreshTokenHandler);

export default router;