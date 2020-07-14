import express from 'express';
import { Response, Request } from 'express';
import i18next from 'i18next';
import Backend from 'i18next-node-fs-backend';
import Middleware from 'i18next-express-middleware';
import chalk from 'chalk';
import * as WebSocket from 'ws';
const path = require('path');
const app: any = express();
let wss: WebSocket.Server;

import { registerRoutes } from './routes';
import { setEnvironment } from './config/env';
import { connectToDB } from './config/db';
import * as dbApp from './db.app';

const tryToConnectToDb = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      await connectToDB();
      resolve();
    } catch (ex) {
      setTimeout(() => {
        console.log('Retry to connect to db:');
        tryToConnectToDb();
      }, 5000);
    }
  });
};

(async () => {
  setEnvironment(app);
  await tryToConnectToDb();

  i18next
    .use(Middleware.LanguageDetector)
    .use(Backend)
    .init(
      {
        fallbackLng: 'en',
        debug: false,
        backend: {
          loadPath: __dirname + `/locales/{{lng}}/translation.json`,
        },
      },
      (err, t) => {
        if (!err) {
          console.log('locale detected: ' + i18next.t('__langauge_detected'));
        } else {
          console.log(err);
        }
      }
    );

  app.use(Middleware.handle(i18next, {}));

  registerRoutes(app);

  app.get('*', (req: Request, res: Response) => {
    if (
      !process.env.NODE_ENV ||
      process.env.NODE_ENV.toString().trim() !== 'production'
    ) {
      return res.send('Running server in development mode.');
    } else {
      return res.sendFile('index.html', {
        root: path.join(__dirname, '/vue-dist'),
      });
    }
  });

  // Starts the server on the given port
  // let port = process.env.NODE_ENV === 'production' ? 8088 : 3000;
  // app.listen(port, () => {
  //   console.log(
  //     `rcu-monitor app listening on port ${port} in ${process.env.NODE_ENV} mode!`
  //   );
  // });

  let server = require('http').createServer();
  wss = new WebSocket.Server({
    server: server,
  });
  server.on('request', app);
  wss.on('connection', (ws) => {
    ws.on('message', (message) => {
      console.log('received: %s', message);
    });
    ws.send('send by wss server!');
  });
  let port = process.env.NODE_ENV === 'production' ? 8088 : 3000;
  server.listen(port, () => {
    console.log(`http/ws server listening on ${port}`);
  });

  await dbApp.createAdminIfNotExisted();
  /*
  rcuApp.initUdp();
  rcuApp.startQuery();
  */
})();

export { wss };
