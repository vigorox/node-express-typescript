import { Response, Request, NextFunction } from 'express';
import User from '../../model/user-model';
import * as auth from '../../services/auth-service';
import { StringUtil } from '../../utilities/string-util';

export function index(req: Request, res: Response) {
  return res.status(200).send('hello world!');
}
