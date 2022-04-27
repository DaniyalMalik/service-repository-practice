import MainInterface from '../repoModels/MainInterface.model';
import { SubTodo } from '../repoModels/SubTodo.model';

export class MergedTodo implements MainInterface {
  id: string = '';
  name: string = '';
  description: string = '';
  done: boolean = false;
  subTodos: SubTodo[] = [];
  createdAt: number = new Date().getTime();
}
