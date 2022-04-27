import * as express from 'express';
import { Todo } from '../models/repoModels/Todo.model';
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
  let todo: Todo = req.body.todo;
  const result = await todoService.addTodo(todo);

  res.json(result);
});

router.get('/', async (req, res) => {
  const result = await todoService.getTodos();

  res.json(result);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const result = await todoService.deleteTodo(id);

  res.json(result);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await todoService.getTodo(id);

  res.json(result);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const todo: Todo = req.body.todo;
  const result = await todoService.updateTodo(id, todo);

  res.json(result);
});

module.exports = router;
