import express from 'express';
import * as controller from '../../controllers/usersControllers/logOutController.js';
import verifyJWT from '../../middlewares/verifyJWT.js';

const router = express.Router();

router.post('/', controller.logOutHandler);

export default router;