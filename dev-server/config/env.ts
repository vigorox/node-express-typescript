import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
const path = require('path');

/**
 * Determines the current environment and sets the appropriate variables
 * @param {Express App} app
 */
export function setEnvironment(app: any) {
  if (
    !process.env.NODE_ENV ||
    process.env.NODE_ENV.toString().trim() !== 'production'
  ) {
    setDevEnv(app);
  } else {
    setProdEnv(app);
  }
}

/**
 * Used to set development environment variables
 * @param {Express App} app
 */
function setDevEnv(app: any) {
  process.env.NODE_ENV = 'development';
  app.use(bodyParser.json()); // Allows parsing JSON from the client
  app.use(morgan('dev')); // Log HTTP Requests to the node console (for debugging purposes)
  app.use(cors()); // Enable Cross Origin Requests, since Vue.JS is on a different origin
  process.env.DB_URL = 'mongodb://localhost:27017/template-db';
  process.env.TOKEN_SECRET = '27946982a9a4408996607fe95a62ffff';
}

/**
 * Used to set production environment variables
 * @param {Express App} app
 */
function setProdEnv(app: any) {
  process.env.NODE_ENV = 'production';
  // process.env.DB_URL = 'mongodb://user:password123@ds133642.mlab.com:33642/vue-db';
  process.env.DB_URL = 'mongodb://localhost:27017/template-db';
  process.env.TOKEN_SECRET = '27946982a9a4408996607fe95a62ffff';
  app.use(bodyParser.json());
  app.use(express.static( path.join(__dirname , '../vue-dist') ));
}
