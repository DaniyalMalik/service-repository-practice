import { injectable } from 'inversify';
import { TodoInterfaceService } from '../interfaces/todoInterface.service';
import { Todo } from '../../models/Todo.model';

@injectable()
export class TodoService implements TodoInterfaceService {
  constructor() {}

  public async addTodo(todo: Todo): Promise<any> {
    console.log('here in addTodo!', todo);
  }

  public async getTodos(): Promise<any> {
    console.log('here in getTodos!');
  }

  public async getTodosByDone(): Promise<any> {
    console.log('here in getTodosByDone!');
  }

  public async deleteTodo(): Promise<any> {
    console.log('here in deleteTodo!');
  }

  public async getTodo(): Promise<any> {
    console.log('here in getTodo!');
  }

  public async updateTodo(): Promise<any> {
    console.log('here in updateTodo!');
  }
}
