import { Role } from '../../models/repoModels/Role.model';

export interface RoleInterfaceRepository {
  addRole(role: Role): Promise<any>;
  //   getTodos(): Promise<any>;
  //   deleteTodo(id: string): Promise<any>;
  //   getTodo(id: string): Promise<any>;
  //   updateTodo(id: string, todo: Todo): Promise<any>;
}
