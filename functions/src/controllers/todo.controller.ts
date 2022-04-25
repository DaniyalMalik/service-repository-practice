import * as express from 'express';
import { Todo } from '../models/Todo.model';
import { TodoInterfaceService } from '../services/interfaces/todoInterface.service';
import IDENTIFIERS from '../identifiers';
import { resolve } from '../dependencyManagement';

const { Router } = express;
const router = Router();

function getTodoService(): TodoInterfaceService {
  return resolve<TodoInterfaceService>(IDENTIFIERS.TodoService);
}

const todoService = getTodoService();

router.post('/', async (req, res) => {
  let todo: Todo = req.body;

  const result = await todoService.addTodo(todo);

  res.json({ success: true, result });
});

router.get('/', async (req, res) => {
  const result = await todoService.getTodos();
  console.log(result, 'result');
  res.send(result);
});

router.get('/byDone', async (req, res) => {
  let { done } = req.query;
  let boolVal: boolean = done === 'true' ? true : false;
  const result = await todoService.getTodosByDone(boolVal);

  res.json({ success: true, result });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  await todoService.deleteTodo(id);

  res.json({ success: true, message: 'Deleted!' });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await todoService.getTodo(id);

  if (result) {
    res.json({ success: true, result });
  } else {
    res.json({ success: false });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { todo } = req.body;
  const result = await todoService.updateTodo(id, todo);

  res.json({ success: true, result });
});

module.exports = router;
