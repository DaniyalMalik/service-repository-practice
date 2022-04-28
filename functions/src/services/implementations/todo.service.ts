import { injectable, inject } from 'inversify';
import { TodoInterfaceService } from '../interfaces/todoInterface.service';
import { Todo } from '../../models/repoModels/Todo.model';
import { ResponseModel } from '../../models/repoModels/Response.model';
import IDENTIFIERS from '../../identifiers';
import { TodoInterfaceRepository } from '../../repositories/interfaces/todoInterface.repository';
import { SubTodo } from '../../models/repoModels/SubTodo.model';
import { DataCopier } from '../../services/implementations/dataCopier';

@injectable()
export class TodoService implements TodoInterfaceService {
  constructor(
    @inject(IDENTIFIERS.TodoRepository)
    private varTodoRepository: TodoInterfaceRepository,
  ) {}

  public async addTodo(todo: Todo): Promise<any> {
    const res = new ResponseModel();
    let newTodo: Todo = new Todo();
    const validatedTodo = DataCopier.copy(newTodo, todo);

    newTodo = { ...newTodo };
    newTodo = Object.assign(newTodo, validatedTodo);

    const result = await this.varTodoRepository.addTodo(newTodo);

    res.setSuccessResponseAndDataWithMessage(result, 'New todo added!', true);

    return res;
  }

  public async addSubTodo(id: string, subTodo: SubTodo): Promise<any> {
    const res = new ResponseModel();
    let newSubTodo: SubTodo = new SubTodo();
    const validatedTodo = DataCopier.copy(newSubTodo, subTodo);

    newSubTodo = { ...newSubTodo };
    newSubTodo.todoId = id;
    newSubTodo = Object.assign(newSubTodo, validatedTodo);

    const result = await this.varTodoRepository.addSubTodo(id, newSubTodo);

    res.setSuccessResponseAndDataWithMessage(
      result,
      'New sub todo added!',
      true,
    );

    return res;
  }

  public async getTodos(): Promise<any> {
    const result = await this.varTodoRepository.getTodos();
    const res = new ResponseModel();

    if (!result || result.length === 0) {
      res.setSuccessResponse('No todo found!', false);
    } else {
      res.setSuccessResponseAndData(result, true);
    }

    return res;
  }

  public async getTodosByDone(done: boolean): Promise<any> {
    const result = await this.varTodoRepository.getTodosByDone(done);
    let obj = {};
    const res = new ResponseModel();

    if (!result || result.length === 0) {
      res.setSuccessResponse('No todo found!', false);
    } else {
      res.setSuccessResponseAndData(result, true);
    }

    return obj;
  }

  public async deleteTodo(id: string): Promise<any> {
    const res = new ResponseModel();
    const result = await this.varTodoRepository.deleteTodo(id);

    res.setSuccessResponseAndDataWithMessage(result, 'Todo deleted!', true);

    return res;
  }

  public async getTodo(id: string): Promise<any> {
    const result = await this.varTodoRepository.getTodo(id);
    const res = new ResponseModel();

    if (!result) {
      res.setSuccessResponse('No todo found!', false);
    } else {
      res.setSuccessResponseAndData(result, true);
    }

    return res;
  }

  public async updateTodo(id: string, todo: Todo): Promise<any> {
    let newTodo: Todo = new Todo();
    const validatedTodo = DataCopier.copy(newTodo, todo);
    const result = await this.varTodoRepository.updateTodo(id, validatedTodo);
    const res = new ResponseModel();

    res.setSuccessResponseAndDataWithMessage(result, 'Todo updated!', true);

    return res;
  }

  public async updateSubTodo(
    id: string,
    todoId: string,
    subTodo: SubTodo,
  ): Promise<any> {
    let newSubTodo: SubTodo = new SubTodo();
    const validatedSubTodo = DataCopier.copy(newSubTodo, subTodo);
    const result = await this.varTodoRepository.updateSubTodo(
      id,
      todoId,
      validatedSubTodo,
    );
    const res = new ResponseModel();

    res.setSuccessResponseAndDataWithMessage(result, 'Sub todo updated!', true);

    return res;
  }
}
