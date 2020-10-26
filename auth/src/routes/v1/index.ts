import { Router } from 'express'

import { validate } from '../../middleware'
import { register, signin } from '../../controllers'

const router = Router()

router.route('/register').post(validate('register'), register)
router.route('/signin').post(validate('signin'), signin)

export { router as routes }
