import { User } from '../../models/repoModels/User.model';
import { injectable } from 'inversify';
import * as admin from 'firebase-admin';

@injectable()
export class UserRepository {
  public DB: admin.firestore.Firestore;

  constructor() {
    this.DB = admin.firestore();
  }

  public async addUser(user: User): Promise<any> {
    let result: any = await this.DB.collection('User').add(user);

    await this.DB.collection('User').doc(result.id).update({ id: result.id });

    result = await result.get();
    result = result.data();

    return result;
  }

  public async getUsers(): Promise<any> {
    try {
      const result = await this.DB.collection('User').get();
      let entries: any = [];

      result.forEach((doc) => {
        const entry = doc.data();

        entries.push(entry);
      });

      return entries;
    } catch (error) {
      return error;
    }
  }

  public async deleteUser(id: string): Promise<any> {
    const result = await this.DB.collection('User').doc(id).delete();

    return result;
  }

  public async getUser(id: string): Promise<any> {
    let doc: any = await this.DB.collection('User').doc(id).get();
    let subDoc: any = await this.DB.collection('User/' + id + '/SubUser').get();
    let entries: any = [];

    doc = doc.data();
    subDoc.forEach((document: any) => {
      const entry = document.data();

      entries.push(entry);
    });

    return { User: doc, SubUsers: entries };
  }

  public async updateUser(id: string, user: User): Promise<any> {
    await this.DB.collection('User').doc(id).update(user);

    let doc: any = await this.DB.collection('User').doc(id).get();

    doc = doc.data();

    return doc;
  }
}
