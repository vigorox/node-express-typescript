import { Response, Request, NextFunction } from 'express';
import User from '../../model/user-model';
import * as auth from '../../services/auth-service';
import { StringUtil } from '../../utilities/string-util';

export function index(req: Request, res: Response) {
  // FIND ALL USERS
  User.find({}, (error, users) => {
    if (error) {
      return res.status(500).json();
    }
    return res.status(200).json({ users: users });
  });
}

export function update(req: Request, res: Response) {
  const id = req.body._id;

  User.findOne({ _id: id }, (error, user) => {
    if (error) {
      console.log(error);
      return res.status(500).json();
    }
    if (!user) {
      return res.status(404).json();
    }

    user.password = req.body.password;
    user.first = req.body.first;
    user.last = req.body.last;
    user.role = req.body.role;
    user.updatedAt = new Date();

    User.findByIdAndUpdate({ _id: user.id }, user, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json();
      }
      return res.status(204).json();
    });
  });
}

export async function create(req: Request, res: Response) {
  const validation = await validateIndex(req);
  if (!validation.isValid) {
    console.log('not valid!');
    return res.status(403).json({ message: validation.message });
  }

  const user = new User({
    username: req.body.username,
    password: req.body.password,
    first: req.body.first,
    last: req.body.last,
    role: req.body.role
  });
  user.save((error) => {
    if (error) {
      console.log('save error: ' + error);
      // Mongoose Error Code 11000 means validation failure (username taken)
      if (error.code === 11000) {
        return res
          .status(403)
          .json({ message: user.username +  req.t('_is_already_existed!') });
      }
      return res.status(500).json();
    }
    return res.status(201).json();
  });
}

async function validateIndex(req: Request) {
  const body = req.body;
  let errors = '';
  if (StringUtil.isEmpty(body.username)) {
    errors += req.t('Username_is_required!');
  }
  if (StringUtil.isEmpty(body.password)) {
    errors += req.t('Password_is_required!');
  }
  if (StringUtil.isEmpty(body.first)) {
    errors += req.t('First_name_is_required!');
  }
  if (StringUtil.isEmpty(body.last)) {
    errors += req.t('Last_name_is_required!');
  }

  const user = await User.findOne({ username: body.username });
  if (user) {
    console.log('user existed');
    errors += `${body.username}${req.t('_is_already_existed!')}`;
  }

  return {
    isValid: StringUtil.isEmpty(errors),
    message: errors
  };
}

export function remove(req: Request, res: Response) {
  const id = req.params.id;

  User.findOne({ _id: id }, (error, user) => {
    if (error) {
      return res.status(500).json();
    }
    if (!user) {
      return res.status(404).json();
    }

    if (user.username.toString() === 'admin') {
      return res.status(403).json({
        message: 'Cannot delete admin!'
      });
    }

    if (user._id === auth.getUserId(req)) {
      return res.status(403).json({
        message: 'Cannot delete user itself!'
      });
    }

    User.deleteOne({ _id: id }, (err) => {
      if (err) {
        console.log(error);
        return res.status(500).json();
      }
      return res.status(204).json();
    });
  });
}
