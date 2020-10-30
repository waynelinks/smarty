import { Request, Response } from 'express'
import { BadRequestError } from '@bigoncloud/errors'

import { createNewUser } from '../services'

export const register = async (req: Request, res: Response): Promise<void> => {
  const token: string | null = await createNewUser(req.body)
  if (!token) throw new BadRequestError('Invalid Credentials!')

  req.session = {
    jwt: token,
  }

  res.status(201).json({
    status: 'success',
    message: 'Registration successful',
  })
}
