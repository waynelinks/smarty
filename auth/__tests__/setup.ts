import { sql } from '../src/db'
import { DB_TABLE } from '../src/config'

beforeEach(async () => {
  await sql(DB_TABLE).truncate()
})

afterEach(async () => {
  await sql(DB_TABLE).truncate()
})
