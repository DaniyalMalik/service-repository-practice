import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';
import 'reflect-metadata';
import { AuthenticationService } from './services/implementations/authentication.service';

admin.initializeApp(functions.config().firebase);

const todoController = require('./controllers/todo.controller');
const userController = require('./controllers/user.controller');

const main = express();
const app = express();
const authenticationService = new AuthenticationService();

main.use('/api/v1', app);
main.use(cors());
main.use(express.json());
main.use(express.urlencoded({ extended: true }));

export const practiceProjectApi = functions.https.onRequest(main);

app.use(async function (req: any, res: any, next: any) {
  authenticationService
    .authenticate(req)
    .then((r: any) => {
      if (r) {
        next();
      } else {
        res.status(401).json({ success: false, message: 'Unauthorized user!' });
      }
    })
    .catch((err: any) => {
      console.log(err.message);
      res.status(401).json({ success: false, message: 'Unauthorized user!' });
    });
});
app.use('/user', userController);
app.use('/todo', todoController);
