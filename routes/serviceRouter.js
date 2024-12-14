import express from 'express';
import optionalVerifyJWT from '../middlewares/optionalVerifyJWT.js';
import * as controller from '../controllers/servicesController.js';

const router = express.Router();

router.get('/', optionalVerifyJWT, controller.getAllServices);

export default router;