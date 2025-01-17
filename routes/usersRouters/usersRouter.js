import express from 'express';
import verifyJWT from '../../middlewares/verifyJWT.js';
import * as controller from '../../controllers/usersControllers/usersController.js';

const router = express.Router();

router.get('/', verifyJWT, controller.getAllUsers);

export default router;