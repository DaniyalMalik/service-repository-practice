import { Role } from '../../models/repoModels/Role.model';
import { injectable } from 'inversify';
import * as admin from 'firebase-admin';
import { RoleInterfaceRepository } from '../interfaces/roleInterface.repository';

@injectable()
export class RoleRepository implements RoleInterfaceRepository {
  public DB: admin.firestore.Firestore;

  constructor() {
    this.DB = admin.firestore();
  }

  public async addRole(role: Role): Promise<any> {
    let result: any = await this.DB.collection('Role').add(role);

    await this.DB.collection('Role').doc(result.id).update({ id: result.id });

    result = await result.get();
    result = result.data();

    return result;
  }

  //   public async getTodos(): Promise<any> {
  //     try {
  //       const subTodoResults = await this.DB.collectionGroup('SubTodo').get();
  //       const todoResults = await this.DB.collection('Todo').get();
  //       let entries1: any = [];
  //       let entries2: any = [];

  //       todoResults.forEach((doc) => {
  //         const entry = doc.data();

  //         entries1.push(entry);
  //       });
  //       subTodoResults.forEach(async (doc) => {
  //         const entry = doc.data();

  //         entries2.push(entry);
  //       });
  //       entries1.forEach(async (doc1: MergedTodo) => {
  //         entries2.forEach(async (doc2: SubTodo) => {
  //           if (doc1.id === doc2.todoId) {
  //             if (doc1.subTodos) {
  //               doc1.subTodos.push(doc2);
  //             } else {
  //               doc1.subTodos = [doc2];
  //             }
  //           }
  //         });
  //       });

  //       return entries1;
  //     } catch (error) {
  //       return error;
  //     }
  //   }

  //   public async getTodo(id: string): Promise<any> {
  //     let doc: any = await this.DB.collection('Todo').doc(id).get();
  //     let subDoc: any = await this.DB.collection('Todo/' + id + '/SubTodo').get();
  //     let entries: any = [];

  //     doc = doc.data();
  //     subDoc.forEach((document: any) => {
  //       const entry = document.data();

  //       entries.push(entry);
  //     });

  //     return { Todo: doc, SubTodos: entries };
  //   }

  //   public async updateTodo(id: string, todo: Todo): Promise<any> {
  //     await this.DB.collection('Todo').doc(id).update(todo);

  //     let doc: any = await this.DB.collection('Todo').doc(id).get();

  //     doc = doc.data();

  //     return doc;
  //   }
}
