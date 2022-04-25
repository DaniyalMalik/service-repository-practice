import * as functions from 'firebase-functions';
// import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';
import 'reflect-metadata';

const todoController = require('./controllers/todo.controller');

const main = express();
const app = express();

// admin.initializeApp(functions.config().firebase);

main.use('/api/v1', app);
main.use(cors());
main.use(express.json());
main.use(express.urlencoded({ extended: true }));

export const practiceProjectApi = functions.https.onRequest(main);

// type User = {
//   id: number;
//   fullName: string;
// };

// const user: User = {
//   id: 1,
//   fullName: 'malik',
// };

// console.log(user, 'user');
// user.phone = 0300;
// console.log(user.phone, 'user');

app.use('/todo', todoController);
