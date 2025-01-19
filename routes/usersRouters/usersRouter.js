import express from 'express';
import verifyJWT from '../../middlewares/verifyJWT.js';
import * as controller from '../../controllers/usersControllers/usersController.js';
import verifyRoles from '../../middlewares/verifyRoles.js';

const router = express.Router();

router.get('/', verifyJWT, controller.getAllUsers);

router.patch('/:id', verifyJWT, verifyRoles('siteAdmin'), controller.updateUser);

export default router;