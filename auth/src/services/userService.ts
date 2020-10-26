import { DB_TABLE } from '../config'
import { sql } from '../db'
import { IUser } from '../interfaces'
import { doPassword, createToken } from '../security'

const FindUserByEmail = async (email: string) => sql(DB_TABLE).where({ email })

export const createNewUser = async (payload: IUser): Promise<string | null> => {
  const { email, password } = payload

  const userExist = await FindUserByEmail(email)
  if (userExist.length) return null

  payload.password = await doPassword.hash(password)

  const user = await sql('users')
    .insert(payload)
    .returning(['id', 'name', 'email'])

  return createToken(user[0])
}
