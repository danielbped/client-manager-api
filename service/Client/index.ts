import { Client } from '../../entities/Client';
import ClientModel from '../../model/Client'

export default {
  async list() {
    return ClientModel.list();
  },
  async findByQuery(query: string) {
    return ClientModel.findByQuery(query);
  },
  async create(client: Partial<Client>) {
    if (client.email) {
      const clientFound = await ClientModel.findByEmail(client.email);

      if (clientFound) {
        throw new Error('Email already in use');
      };
    };

    client.coordinate?.replace(',', '.');

    return ClientModel.create(client);
  }
}