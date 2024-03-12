import { User } from '../../entities/User';
import UserModel from '../../model/User'

export default {
  async list() {
    return UserModel.list();
  },
  async findByQuery(query: string) {
    return UserModel.findByQuery(query);
  },
  async create(user: Partial<User>) {
    if (user.email) {
      const UserFound = await UserModel.findByEmail(user.email);

      if (UserFound) {
        throw new Error('Email already in use');
      };
    };

    return UserModel.create(user);
  },
  async login(user: Partial<User>) {
    if (user.email && user.password) {
      const UserFound = await UserModel.findByEmail(user.email);

      if (!UserFound) {
        throw new Error('Email not found');
      };

      if (user.password === UserFound.password) {
        return true;
      } return false;
    }

    throw new Error('Missing required fields');
  }
}