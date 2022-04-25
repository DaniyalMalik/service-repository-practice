import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as express from 'express';
import { Todo } from '../models/Todo.model';
import { TodoInterfaceService } from "../services/interfaces/todoInterface.service";

admin.initializeApp(functions.config().firebase);

const { Router } = express;
const DB = admin.firestore();
const router = Router();

function getTodoService(): TodoInterfaceService {
  return resolve<TodoInterfaceService>(IDENTIFIER.TodoInterfaceService);
}

const todoService = getTodoService();

router.post('/', async (req, res) => {
  let todo: Todo = req.body;
  let newTodo: Todo = new Todo();

  newTodo = { ...newTodo };
  newTodo = Object.assign(newTodo, todo);

  let result: any = await DB.collection('Todo').add(newTodo);

  await DB.collection('Todo').doc(result.id).update({ id: result.id });

  result = await result.get();
  result = result.data();

  res.json({ success: true, result });
});

router.get('/', async (req, res) => {
  const result = await DB.collection('Todo').get();
  const entries: any = [];

  result.forEach((doc) => {
    const entry = doc.data();

    entries.push(entry);
  });

  res.json({ success: true, entries });
});

router.get('/byDone', async (req, res) => {
  let { done } = req.query;
  let boolVal: boolean = done === 'true' ? true : false;
  const result = await DB.collection('Todo').where('done', '==', boolVal).get();
  const entries: any = [];

  result.forEach((doc) => {
    const entry = doc.data();

    entries.push(entry);
  });

  res.json({ success: true, entries });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  await DB.collection('Todo').doc(id).delete();

  res.json({ success: true, message: 'Deleted!' });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  let doc: any = await DB.collection('Todo').doc(id).get();

  doc = doc.data();

  res.json({ success: true, doc });
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { todo } = req.body;

  await DB.collection('Todo').doc(id).update(todo);

  let doc: any = await DB.collection('Todo').doc(id).get();
  doc = doc.data();

  res.json({ success: true, doc });
});

module.exports = router;
