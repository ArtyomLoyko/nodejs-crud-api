import { UserI } from './types'

class UsersDB {
  users: UserI[];

  constructor(defaultUsers: UserI[] = []) {
    this.users = defaultUsers;
  }

  getAllUsers(): UserI[] {
    return this.users;
  }

  getUserById(id: string): UserI | undefined {
    return this.users.find(u => u.id === id);
  }
}

export const usersDB = new UsersDB();