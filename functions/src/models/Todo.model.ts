import MainInterface from './MainInterface.model';

export class Todo implements MainInterface {
  id: string = '';
  name: string = '';
  description: string = '';
  done: boolean = false;
  createdOnDate: number = new Date().getTime();
}
