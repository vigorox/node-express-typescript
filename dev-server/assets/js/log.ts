import chalk from 'chalk';

export default class Log {
  static write(msg: string, keyword?: string) {
    if (!keyword) {
      console.log(msg);
    } else {
      try {
        console.log(chalk.keyword(keyword)(msg));
      } catch (ex) {
        console.log(msg);
      }
    }
  }
}
