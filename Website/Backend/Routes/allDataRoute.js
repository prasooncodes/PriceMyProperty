import express from 'express';
import { allDataController } from '../Controllers/allDataController.js';

const router = express.Router();

router.get('/:page', allDataController); // Change from POST to GET

export default router;