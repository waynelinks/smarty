import { verify } from 'jsonwebtoken'

import { IUser, TokenPayload } from '../../interfaces'
import { createToken } from '../createToken'
import { ACCESS_TOKEN_SECRET } from '../../config'

const user: IUser = {
  id: '123',
  name: 'name',
  email: 'name.you@test.com',
  password: 'password',
}

describe('JWT Service', () => {
  describe('Create Token', () => {
    it('Create valid token when user [register, login]', async () => {
      const token = createToken(user)
      const decoded = verify(token, ACCESS_TOKEN_SECRET) as TokenPayload

      expect(decoded.email).toEqual(user.email)
      expect(decoded).not.toHaveProperty('password')
    })
  })
})
