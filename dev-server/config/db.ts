import mongoose from 'mongoose';
import chalk from 'chalk';

export async function connectToDB() {
  // mongoose.set('debug', true);
  try {
    await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, });
    console.log(chalk.cyan('Connected to MongoDB!'));
  } catch(ex) {
    console.log(chalk.red('Unable to connect to MongoDb!'));
    throw ex;
  }
}
