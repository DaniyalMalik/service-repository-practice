import { Todo } from '../../models/Todo.model';

export interface TodoInterfaceRepository {
  addTodo(todo: Todo): Promise<any>;
  getTodos(): Promise<any>;
  getTodosByDone(done: boolean): Promise<any>;
  deleteTodo(id: string): Promise<any>;
  getTodo(id: string): Promise<any>;
  updateTodo(id: string, todo: Todo): Promise<any>;
}
