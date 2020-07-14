import User from './model/user-model';
import chalk from 'chalk';

export async function createAdminIfNotExisted() {
  const user = await User.findOne({ username: 'admin' });
  if (!user) {
    console.log(chalk.cyan('admin does not exist. create an admin account.'));
    const newUser = new User({
      username: 'admin',
      password: 'admin',
      first: 'admin',
      last: 'admin',
      role: 255,
    });

    await newUser.save();
    console.log(chalk.cyan('admin is created'));
  } else {
    console.log(chalk.cyan('admin exists'));
  }
}
