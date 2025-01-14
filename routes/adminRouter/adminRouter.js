import express from 'express';
import * as controller from '../../controllers/adminControllers/adminController.js';

const router = express.Router();

router.post('/login', controller.logInAdmin);

export default router;