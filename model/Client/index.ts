import { client } from "../../database";
import { uuid } from "uuidv4";
import { Client } from "../../entities/Client";

export default {
  async list() {
    try {
      const result = await client.query('SELECT * FROM public.clients');
  
      return {
        result: result.rows,
        count: result.rowCount
      };
    } catch (err: any) {
      console.error(err);
      throw new Error(err);
    }
  },
  async findByQuery(query: string) {
    try {
      const result = await client.query(`
        SELECT * FROM public.clients
          WHERE name LIKE LOWER('%${query}%')
          OR email LIKE LOWER('%${query}%')
      `);

      return {
        result: result.rows,
        count: result.rowCount
      };
    } catch (err: any) {
      console.error(err);
      throw new Error(err);
    }
  },
  async create(data: Partial<Client>) {
    try {
      await client.query(`
        INSERT INTO public.clients(
          id, name, email, phone)
          VALUES ('${uuid()}', '${data.name}', '${data.email}', '${data.phone}');
        `);
      
      return {
        name: data.name,
        email: data.email,
        phone: data.phone,
      };
    } catch (err: any) {
      console.error(err);
      throw new Error(err);
    };
  },
  async findByEmail(email: string) {
    try {
      const result = await client.query(`
        SELECT * FROM public.clients where email = '${email}'
      `);

      return result.rows[0];
    } catch (err: any) {
      console.error(err);
      throw new Error(err);
    };
  }
};
