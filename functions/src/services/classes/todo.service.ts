import { injectable, inject } from 'inversify';
import { TodoInterfaceService } from '../interfaces/todoInterface.service';
import { Todo } from '../../models/Todo.model';
import IDENTIFIERS from '../../identifiers';
import { TodoInterfaceRepository } from '../../repositories/interface/todoInterface.repository';

@injectable()
export class TodoService implements TodoInterfaceService {
  constructor(
    @inject(IDENTIFIERS.TodoRepository)
    private varTodoRepository: TodoInterfaceRepository,
  ) {}

  public async addTodo(todo: Todo): Promise<any> {
    let newTodo: Todo = new Todo();

    newTodo = { ...newTodo };
    newTodo = Object.assign(newTodo, todo);

    const result = await this.varTodoRepository.addTodo(newTodo);
    console.log(result, 'result');
    return result;
  }

  public async getTodos(): Promise<any> {
    const result = await this.varTodoRepository.getTodos();

    return result;
  }

  public async getTodosByDone(done: boolean): Promise<any> {
    const result = await this.varTodoRepository.getTodosByDone(done);

    return result;
  }

  public async deleteTodo(id: string): Promise<any> {
    const result = await this.varTodoRepository.deleteTodo(id);
    console.log(result, 'result');
    return result;
  }

  public async getTodo(id: string): Promise<any> {
    const result = await this.varTodoRepository.getTodo(id);
    console.log(result, 'result');
    return result;
  }

  public async updateTodo(id: string, todo: Todo): Promise<any> {
    const result = await this.varTodoRepository.updateTodo(id, todo);
    console.log(result, 'result');
    return result;
  }
}
