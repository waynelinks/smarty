import { doPassword } from '../doPassword'

const password = 'password'

describe('Hash Service', () => {
  describe('Create Hash', () => {
    it('Hash user password', async () => {
      const hash: string = await doPassword.hash(password)
      const isValid: boolean = await doPassword.check(password, hash)

      expect(isValid).toBeTruthy()
    })
  })
})
