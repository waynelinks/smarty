import { Router } from 'express'

import { validate } from '../../middleware'
import { register } from '../../controllers'

const router = Router()

router.route('/register').post(validate('register'), register)

export { router as routes }
