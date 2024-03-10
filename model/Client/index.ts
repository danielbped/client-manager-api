import { client } from "../../database"
import { uuid } from "uuidv4"

export default {
  async list() {
    const result = await client.query('SELECT * FROM public.clients');

    return {
      result: result.rows,
      count: result.rowCount
    }
  },
  async create(name: string, email: string, phone: string) {
    return client.query(`
    INSERT INTO public.clients(
      id, name, email, phone)
      VALUES (${uuid()}, ${name}, ${email}, ${phone});`)
  }
}