import request from 'supertest'

import { IUser } from '../../interfaces'
import { app } from '../../app'
import { BASE_API_V1 } from '../../config'

const register: IUser = {
  name: 'test',
  email: 'test@test.com',
  password: 'password',
}

const user = {
  email: 'test@test.com',
  password: 'password',
}

describe('User Service', () => {
  describe('Signin existing user', () => {
    beforeEach(async () => {
      await request(app)
        .post(`${BASE_API_V1}/register`)
        .send(register)
        .expect(201)
    })

    it('POST /signin - return 200 when login successful', async () => {
      await request(app).post(`${BASE_API_V1}/signin`).send(user).expect(200)
    })

    it('POST /signin - return 400 when email does not exist', async () => {
      const res = await request(app)
        .post(`${BASE_API_V1}/signin`)
        .send({
          email: 'test@doesnotexist.com',
          password: 'password',
        })
        .expect(400)

      expect(res.text).toContain('Invalid Credentials!')
      expect(res.text).not.toContain('Something went wrong')
    })

    it('POST /signin - return 400 when invalid email', async () => {
      const res = await request(app)
        .post(`${BASE_API_V1}/signin`)
        .send({
          email: 'test.com',
          password: 'aslkdfjalskdfj',
        })
        .expect(400)

      expect(res.text).toContain('must be a valid email')
      expect(res.text).not.toContain('Something went wrong')
    })

    it('POST /signin - return 400 when invalid password', async () => {
      const res = await request(app)
        .post(`${BASE_API_V1}/signin`)
        .send({
          email: 'test@test.com',
          password: 'aslkdfjalskdfj',
        })
        .expect(400)

      expect(res.text).toContain('Invalid Credentials!')
      expect(res.text).not.toContain('Something went wrong')
    })

    it('POST /signin - return 400 when cookie is set', async () => {
      const res = await request(app)
        .post(`${BASE_API_V1}/signin`)
        .send(user)
        .expect(200)

      expect(res.get('Set-Cookie')).toBeDefined()
      expect(res.text).not.toContain('Something went wrong')
    })
  })
})
