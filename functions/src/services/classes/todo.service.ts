import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { injectable } from 'inversify';
import { TodoInterfaceService } from '../interfaces/todoInterface.service';
import { Todo } from '../../models/Todo.model';

admin.initializeApp(functions.config().firebase);

const DB = admin.firestore();

@injectable()
export class TodoService implements TodoInterfaceService {
  public async addTodo(todo: Todo): Promise<any> {
    let result: any = await DB.collection('Todo').add(todo);

    await DB.collection('Todo').doc(result.id).update({ id: result.id });

    result = await result.get();
    result = result.data();

    return result;
  }

  public async getTodos(): Promise<any> {
    const result = await DB.collection('Todo').get();
    const entries: any = [];

    result.forEach((doc) => {
      const entry = doc.data();

      entries.push(entry);
    });

    return entries;
  }

  public async getTodosByDone(done: boolean): Promise<any> {
    const result = await DB.collection('Todo').where('done', '==', done).get();
    const entries: any = [];

    result.forEach((doc) => {
      const entry = doc.data();

      entries.push(entry);
    });

    return entries;
  }

  public async deleteTodo(id: string): Promise<any> {
    const result = await DB.collection('Todo').doc(id).delete();

    return result;
  }

  public async getTodo(id: string): Promise<any> {
    let doc: any = await DB.collection('Todo').doc(id).get();

    doc = doc.data();

    return doc;
  }

  public async updateTodo(id: string, todo: Todo): Promise<any> {
    await DB.collection('Todo').doc(id).update(todo);

    let doc: any = await DB.collection('Todo').doc(id).get();

    doc = doc.data();

    return doc;
  }
}
