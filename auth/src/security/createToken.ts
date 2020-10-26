import { sign } from 'jsonwebtoken'

import { IUser } from '../interfaces'
import {
  ACCESS_TOKEN_EXPIRATION,
  ACCESS_TOKEN_SECRET,
  TOKEN_AUDIENCE,
  TOKEN_ISSUER,
} from '../config'

export const createToken = (user: IUser): string => {
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
  }

  return sign(payload, `${ACCESS_TOKEN_SECRET}`, {
    algorithm: 'HS256',
    issuer: TOKEN_ISSUER,
    expiresIn: ACCESS_TOKEN_EXPIRATION,
    audience: TOKEN_AUDIENCE,
    subject: payload.id,
  })
}
