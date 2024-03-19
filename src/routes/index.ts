// src/routes/index.ts

import { Router } from 'express';
import { enqueueEmail } from '../controllers/emailController';
import validateRequest from '../middleware/validateRequest';
import { emailSchema } from '../models/emailJob';

const router = Router();

router.post('/email', validateRequest(emailSchema), enqueueEmail);

export default router;
