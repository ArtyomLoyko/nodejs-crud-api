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

  updateUser(user: UserI): UserI {
    const userIndex = this.users.findIndex(u => u.id === user.id);
    this.users[userIndex] = user;
    return user;
  }

  deleteUser(userId: string): void {
    this.users = this.users.filter(u => u.id === userId);
  }
}

export const usersDB = new UsersDB();