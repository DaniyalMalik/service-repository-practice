import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';
import 'reflect-metadata';

admin.initializeApp(functions.config().firebase);

const todoController = require('./controllers/todo.controller');
const userController = require('./controllers/user.controller');

const main = express();
const app = express();

main.use('/api/v1', app);
main.use(cors());
main.use(express.json());
main.use(express.urlencoded({ extended: true }));

export const practiceProjectApi = functions.https.onRequest(main);

app.use('/user', userController);
app.use('/todo', todoController);
