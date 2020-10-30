import bcrypt from 'bcryptjs'

const salt = 10

export const doPassword = {
  hash: (password: string): Promise<string> => bcrypt.hash(password, salt),
  check: (password: string, hash: string): Promise<boolean> => bcrypt.compare(password, hash),
}
