import request from 'supertest'

import { IUser } from '../../interfaces'
import { app } from '../../app'
import { BASE_API_V1 } from '../../config'

const user: IUser = {
  name: 'myname',
  email: 'myname@test.com',
  password: 'password',
}

describe('User Service', () => {
  describe('Register new user', () => {
    it('POST /register - return 201 when successfull registration', async () => {
      const res = await request(app)
        .post(`${BASE_API_V1}/register`)
        .send(user)
        .expect(201)

      expect(res.body.status).toEqual('success')
      expect(res.body.message).toEqual('Registration successful')
    })

    it('POST /register - return 400 when invalid email', async () => {
      const res = await request(app)
        .post(`${BASE_API_V1}/register`)
        .send({
          name: 'test',
          email: 'alskdflaskjfd',
          password: 'password',
        })
        .expect(400)

      expect(res.text).toContain('must be a valid email')
      expect(res.text).not.toContain('Something went wrong')
    })

    it('POST /register - return 400 when invalid password', async () => {
      const res = await request(app)
        .post(`${BASE_API_V1}/register`)
        .send({
          name: 'test',
          email: 'test@test.com',
          password: 'p',
        })
        .expect(400)

      expect(res.text).toContain('length must be at least 5 characters long')
      expect(res.text).not.toContain('Something went wrong')
    })

    it('POST /register - return 400 when missing email', async () => {
      const res = await request(app)
        .post(`${BASE_API_V1}/register`)
        .send({
          name: 'test',
        })
        .expect(400)

      expect(res.text).toContain('"\\"email\\" is required')
      expect(res.text).not.toContain('Something went wrong')
    })

    it('POST /register - return 400 when missing password', async () => {
      const res = await request(app)
        .post(`${BASE_API_V1}/register`)
        .send({
          name: 'test',
          email: 'test@test.com',
        })
        .expect(400)

      expect(res.text).toContain('"\\"password\\" is required')
      expect(res.text).not.toContain('Something went wrong')
    })

    it('POST /register - return 400 when duplicate email', async () => {
      await request(app)
        .post(`${BASE_API_V1}/register`)
        .send({
          name: 'test',
          email: 'test@test.com',
          password: 'password',
        })
        .expect(201)

      const res = await request(app)
        .post(`${BASE_API_V1}/register`)
        .send({
          name: 'test',
          email: 'test@test.com',
          password: 'password',
        })
        .expect(400)

      expect(res.text).toContain('Invalid Credentials!')
      expect(res.text).not.toContain('Something went wrong')
    })

    it('POST /register - return when Set-Cookie is set', async () => {
      const res = await request(app)
        .post(`${BASE_API_V1}/register`)
        .send({
          name: 'test',
          email: 'test@test.com',
          password: 'password',
        })
        .expect(201)

      expect(res.get('Set-Cookie')).toBeDefined()
    })
  })
})
