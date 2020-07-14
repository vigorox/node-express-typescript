import express from 'express';
import { Response, Request, NextFunction } from 'express';
const router = express.Router();
import * as controller from './test-controller';
import * as auth from '../../services/auth-service';

router.get('/test', controller.index);

export default router;
