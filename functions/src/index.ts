import * as functions from 'firebase-functions';
// import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';

const todoController = require('./controllers/todoController');

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
//   email: string;
//   createdOnDate: string;
// };

app.use('/todo', todoController);
