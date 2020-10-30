import { Request, Response } from 'express'

export const currentActiveUser = (req: Request, res: Response): void => {
  res.send({ currentUser: req.currentUser || null })
}
