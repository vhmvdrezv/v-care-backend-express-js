import express from 'express';

import * as controller from '../controllers/serviceProvidersController.js';

const router = express.Router();

router.get('/', controller.getAllServiceProviders);

export default router;