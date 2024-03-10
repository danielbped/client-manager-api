import { Client } from '../../entities/Client';
import ClientModel from '../../model/Client'

export default {
  async list() {
    return ClientModel.list();
  },
  async create({ name, phone, email }: Partial<Client>) {
    if (email) {
      const client = await ClientModel.findByEmail(email);

      if (client) {
        throw new Error('Email already in use');
      };
    };

    return ClientModel.create({ name, phone, email });
  }
}