import express from 'express';
import { seedFlats } from '../Controllers/seedController.js';

const router = express.Router();

router.post('/seed', seedFlats);

export default router;
