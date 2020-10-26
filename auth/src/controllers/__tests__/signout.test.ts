import request from 'supertest'

import { IUser } from '../../interfaces'
import { app } from '../../app'
import { BASE_API_V1 } from '../../config'

const register: IUser = {
  name: 'test',
  email: 'test@test.com',
  password: 'password',
}

describe('User Service', () => {
  describe('Signout User', () => {
    it('POST /signout -return 200 when cookie is cleared', async () => {
      await request(app)
        .post(`${BASE_API_V1}/register`)
        .send(register)
        .expect(201)

      const res = await request(app)
        .post(`${BASE_API_V1}/signout`)
        .send({})
        .expect(200)

      expect(res.get('Set-Cookie')[0]).toEqual(
        'express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly',
      )
    })
  })
})
