import 'reflect-metadata';
import IDENTIFIERS from './identifiers';
import { Container } from 'inversify';
import { TodoInterfaceService } from './services/interfaces/todoInterface.service';
import { TodoService } from './services/classes/todo.service';
import { TodoRepository } from './repositories/implementations/todo.repository';
import { TodoInterfaceRepository } from './repositories/interface/todoInterface.repository';

let container = new Container();

container.bind<TodoInterfaceService>(IDENTIFIERS.TodoService).to(TodoService);
container
  .bind<TodoInterfaceRepository>(IDENTIFIERS.TodoRepository)
  .to(TodoRepository);

export function resolve<T>(type: symbol): T {
  return container.get<T>(type);
}
