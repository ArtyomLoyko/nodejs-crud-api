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

  addUser(user: UserI): UserI {
    this.users.push(user);
    return user;
  }
}

export const usersDB = new UsersDB();