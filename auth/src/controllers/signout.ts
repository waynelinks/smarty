import { Request, Response } from 'express'

export const signout = (req: Request, res: Response): void => {
  req.session = null

  res.send({})
}
