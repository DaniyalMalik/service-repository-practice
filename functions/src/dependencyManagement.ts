import IDENTIFIER from './identifiers';
import { Container } from 'inversify';
import { TodoInterfaceService } from './services/interfaces/todoInterface.service';
import { TodoService } from './services/classes/todo.service';

let container = new Container();

container.bind<TodoInterfaceService>(IDENTIFIER.UserRepository).to(TodoService);

export function resolve<T>(type: symbol): T {
  return container.get<T>(type);
}
