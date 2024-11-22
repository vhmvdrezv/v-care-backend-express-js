import express from 'express';
import verifyJWT from '../../middlewares/verifyJWT.js';
import * as controller from '../../controllers/usersControllers/userController.js'
const router = express.Router();

router.get('/', verifyJWT, controller.getUserProfile);

router.patch('/', verifyJWT, controller.updateUserProfile)

export default router;

