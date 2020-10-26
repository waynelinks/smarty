import request from 'supertest'

import { IUser } from '../../interfaces'
import { BASE_API_V1 } from '../../config'
import { app } from '../../app'

const register: IUser = {
  name: 'test',
  email: 'test@test.com',
  password: 'password',
}

describe('User Service', () => {
  describe('User Information', () => {
    it('GET /currentuser - return 200 when user details availible', async () => {
      const signup = await request(app)
        .post(`${BASE_API_V1}/register`)
        .send(register)
        .expect(201)

      const cookie = signup.get('Set-Cookie')

      const res = await request(app)
        .get(`${BASE_API_V1}/currentuser`)
        .set('Cookie', cookie)
        .send()
        .expect(200)
      expect(res.body.currentUser.email).toEqual(register.email)
      expect(res.text).not.toContain('Something went wrong')
    })
  })
})
