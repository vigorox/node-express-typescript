import express from 'express';
import { Response, Request, NextFunction } from 'express';
const router = express.Router();
import * as controller from './user-controller';
import * as auth from '../../services/auth-service';

router.get('/user', controller.index);
router.put('/user', auth.requireLogin, controller.update);
router.post('/user', auth.requireLoginAndAdmin, controller.create);
router.delete('/user/:id', auth.requireLoginAndAdmin, controller.remove);

export default router;
