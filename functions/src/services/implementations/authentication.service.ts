// import * as admin from 'firebase-admin';
// import { injectable } from 'inversify';

// @injectable()
// export class TodoService {
//   public async authenticate(req: any): Promise<any> {
//     let authToken;

//     console.log(req.headers.authorization, 'req.headers.authorization');
//     if (
//       req.headers.authorization &&
//       req.headers.authorization.startsWith('Bearer ')
//     ) {
//       authToken = req.headers.authorization.split('Bearer ')[1];
//       console.log(authToken, 'authToken');
//     } else {
//       return false;
//     }

//     try {
//       console.log(admin.auth(), 'admin.auth()');
//       const verify = await admin.auth().verifyIdToken(authToken);
//       console.log(verify, 'verify');
//       return true;
//     } catch (error) {
//       return error;
//     }
//   }

//   public async verifyAuthToken(authToken: string): Promise<any> {
//     try {
//       const verify = await admin.auth().verifyIdToken(authToken);
//       console.log(verify, 'verify');
//       return verify;
//     } catch (error) {
//       return error;
//     }
//   }
// }
