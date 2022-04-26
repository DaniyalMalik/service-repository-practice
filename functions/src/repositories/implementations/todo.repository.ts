import { Todo } from '../../models/Todo.model';
import { injectable } from 'inversify';
import { SubTodo } from '../../models/SubTodo.model';
import * as admin from 'firebase-admin';
// import { TodoInterfaceRepository } from '../interface/todoInterface.repository';

@injectable()
export class TodoRepository {
  public DB: admin.firestore.Firestore;

  constructor() {
    this.DB = admin.firestore();
  }

  public async addTodo(todo: Todo): Promise<any> {
    let result: any = await this.DB.collection('Todo').add(todo);

    await this.DB.collection('Todo').doc(result.id).update({ id: result.id });

    result = await result.get();
    result = result.data();

    return result;
  }

  public async addSubTodo(id: string, subTodo: SubTodo): Promise<any> {
    let result: any = await this.DB.collection('Todo')
      .doc(id)
      .collection('SubTodo')
      .add(subTodo);

    await this.DB.collection('Todo')
      .doc(id)
      .collection('SubTodo')
      .doc(result.id)
      .update({ id: result.id });

    result = await result.get();
    result = result.data();

    return result;
  }

  public async getTodos(): Promise<any> {
    const result = await this.DB.collection('Todo').orderBy('createdAt').get();
    const entries1: any = [];

    result.forEach(async (doc) => {
      const entry = doc.data();
      let entries2: any = [];
      let subDoc: any = await this.DB.collection(
        'Todo/' + entry.id + '/SubTodo',
      ).get();

      await subDoc.forEach((document: any) => {
        const entry = document.data();

        entries2.push(entry);
      });

      entries1.push({ ...entry, ...entries2 });
      
      console.log(entries1, 'entries1');
      console.log(entries2, 'entries2');
    });

    console.log(entries1, 'entries1!!!!!!!!!');
    
    return entries1;
  }

  public async getTodosByDone(done: boolean): Promise<any> {
    const result = await this.DB.collection('Todo')
      .where('done', '==', done)
      .get();
    const entries: any = [];

    result.forEach((doc) => {
      const entry = doc.data();

      entries.push(entry);
    });

    return entries;
  }

  public async deleteTodo(id: string): Promise<any> {
    const result = await this.DB.collection('Todo').doc(id).delete();

    return result;
  }

  public async getTodo(id: string): Promise<any> {
    let doc: any = await this.DB.collection('Todo').doc(id).get();
    let subDoc: any = await this.DB.collection('Todo/' + id + '/SubTodo').get();
    let entries: any = [];

    doc = doc.data();
    subDoc.forEach((document: any) => {
      const entry = document.data();

      entries.push(entry);
    });

    return { Todo: doc, SubTodos: entries };
  }

  public async updateTodo(id: string, todo: Todo): Promise<any> {
    await this.DB.collection('Todo').doc(id).update(todo);

    let doc: any = await this.DB.collection('Todo').doc(id).get();

    doc = doc.data();

    return doc;
  }

  public async updateSubTodo(
    id: string,
    todoId: string,
    subTodo: SubTodo,
  ): Promise<any> {
    await this.DB.collection('Todo/' + todoId + '/SubTodo')
      .doc(id)
      .update(subTodo);

    let doc: any = await this.DB.collection('Todo/' + todoId + '/SubTodo')
      .doc(id)
      .get();

    doc = doc.data();

    return doc;
  }
}
