import { Role } from '../../models/repoModels/Role.model';

export interface RoleInterfaceRepository {
  addRole(userId: string, todoId: string, type: string): Promise<any>;
  updateRole(role: Role): Promise<any>;
  //   getTodos(): Promise<any>;
  //   getTodo(id: string): Promise<any>;
}
