import { client } from "../../database";
import { uuid } from "uuidv4";
import { User } from "../../entities/User";

export default {
  async list() {
    try {
      const result = await client.query('SELECT * FROM public.users');
  
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
        SELECT * FROM public.users
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
  async create(data: Partial<User>) {
    try {
      await client.query(`
        INSERT INTO public.users(
          id, name, email, phone, coordinate)
          VALUES ('${uuid()}', '${data.name}', '${data.email}', '${data.password}');
        `);
      
      return {
        name: data.name,
        email: data.email,
      };
    } catch (err: any) {
      console.error(err);
      throw new Error(err);
    };
  },
  async findByEmail(email: string) {
    try {
      const result = await client.query(`
        SELECT * FROM public.users where email = '${email}'
      `);

      return result.rows[0];
    } catch (err: any) {
      console.error(err);
      throw new Error(err);
    };
  }
};
