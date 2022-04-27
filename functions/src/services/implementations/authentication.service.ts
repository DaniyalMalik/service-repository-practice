import * as admin from 'firebase-admin';

export class AuthenticationService {
  public async authenticate(req: any): Promise<any> {
    let authToken;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer ')
    ) {
      authToken = req.headers.authorization.split('Bearer ')[1];
    } else {
      return false;
    }

    try {
      await admin.auth().verifyIdToken(authToken);

      return true;
    } catch (error) {
      return false;
    }
  }

  public async verifyAuthToken(authToken: string): Promise<any> {
    try {
      await admin.auth().verifyIdToken(authToken);

      return true;
    } catch (error) {
      return false;
    }
  }
}
