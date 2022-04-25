import { Todo } from '../../models/Todo.model';

export interface TodoInterfaceService {
  addTodo(todo: Todo): Promise<any>;
  getTodos(): Promise<any>;
  getTodosByDone(): Promise<any>;
  deleteTodo(): Promise<any>;
  getTodo(): Promise<any>;
  updateTodo(): Promise<any>;
}
