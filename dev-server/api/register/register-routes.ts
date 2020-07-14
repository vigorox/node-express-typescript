import express from 'express';
const router = express.Router();
import * as controller from './register.controller';
import * as auth from '../../services/auth-service';

router.post('/register', auth.requireLoginAndAdmin,  controller.index);

export default router;