import { Todo } from '../../models/Todo.model';
import { SubTodo } from '../../models/SubTodo.model';

export interface TodoInterfaceRepository {
  addTodo(todo: Todo): Promise<any>;
  addSubTodo(id: string, subTodo: SubTodo): Promise<any>;
  getTodos(): Promise<any>;
  getTodosByDone(done: boolean): Promise<any>;
  deleteTodo(id: string): Promise<any>;
  getTodo(id: string): Promise<any>;
  updateTodo(id: string, todo: Todo): Promise<any>;
  updateSubTodo(id: string, todoId: string, subTodo: SubTodo): Promise<any>;
}
