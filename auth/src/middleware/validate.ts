import Joi from 'joi'
import { BadRequestError } from '@bigoncloud/errors'
import { Request, Response, NextFunction } from 'express'

function validateRegistration(req: Request) {
  return Joi.object({
    name: Joi.string().required().trim(),
    email: Joi.string().required().email().trim(),
    password: Joi.string().required().min(5),
  }).validate(req)
}

function validateSignin(req: Request) {
  return Joi.object({
    email: Joi.string().required().email().trim(),
    password: Joi.string().required().min(5),
  }).validate(req)
}

export const validate = (validator: string) => (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  switch (validator) {
    case 'register': {
      const { error } = validateRegistration(req.body)
      if (error) throw new BadRequestError(error.details[0].message)

      break
    }
    case 'signin': {
      const { error } = validateSignin(req.body)
      if (error) throw new BadRequestError(error.details[0].message)

      break
    }
    default:
      break
  }
  next()
}
