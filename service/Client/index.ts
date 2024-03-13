import { uuid } from 'uuidv4';
import { Client } from '../../entities/Client';
import ClientModel from '../../model/Client'

export default {
  async list() {
    return ClientModel.list();
  },
  async findByQuery(query: string) {
    return ClientModel.findByQuery(query);
  },
  async listBestRoute(): Promise<{ result: Client[]; count: number }> {
    const clients = await ClientModel.list();
    const company: Client = {
      name: 'Company',
      email: 'company@email.com',
      phone: '123456789',
      id: uuid(),
      coordinate: '0.0'
    };
  
    let route: Client[] = [company];
    
    route.push(...clients.result)
    route = route.sort((a, b) => {
      const coordinateA = a.coordinate.split('.').map((coordinate: string) => Number(coordinate))
      const coordinateB = b.coordinate.split('.').map((coordinate: string) => Number(coordinate))

      return coordinateA[0] - coordinateB[0] || coordinateA[1] - coordinateB[1]
    });

    route.push(company);
  
    return {
      result: route,
      count: clients.count || 0
    };
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