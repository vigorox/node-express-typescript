import { Response, Request, NextFunction } from 'express';
import { StringUtil } from '../../utilities/string-util';
import User from '../../model/user-model';
import { generateJWT } from '../../services/auth-service';
import chalk from 'chalk';

export async function index(req: Request, res: Response) {
  // First verify that the user provided a username and a password
  const validation = await validateIndex(req.body);
  if (!validation.isValid) {
    return res.status(400).json({ message: validation.message });
  }

  // Find the user in the database
  User.findOne({ username: req.body.username.toLowerCase() }, (error, user) => {
    if (error) {
      return res.status(500).json({ message: 'Error!' });
    }

    if (!user) {
      return res.status(401).json({ message: 'Wrong_username_or_password!' });
    }

    const passwordsMatch = User.passwordMatches(
      req.body.password,
      user.password.toString()
    );
    if (!passwordsMatch) {
      return res.status(401).json({ message: 'Wrong_username_or_password!' });
    }
    const token = generateJWT(user);
    return res.status(200).json({ token: token });
  });
}

/**
 * Validates the index request method
 * @param {HTTP Request Body} body
 */
async function validateIndex(body: any) {
    console.log(chalk.blue('in validateIndex'));
    let errors = '';

    if (StringUtil.isEmpty(body.username)) {
    errors = 'Username_is_required!__-dfadfa';
  } else if (StringUtil.isEmpty(body.password)) {
    errors = 'PPassword_is_required!-fdafadfa';
  }


    return {
    isValid: StringUtil.isEmpty(errors),
    message: errors
  };
}
