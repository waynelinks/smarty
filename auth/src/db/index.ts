import knex from 'knex'

import { DB_URI } from '../config'

export const sql = knex({
  client: 'pg',
  connection: DB_URI,
})
