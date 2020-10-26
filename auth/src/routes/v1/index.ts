import { Router } from 'express'

import { validate } from '../../middleware'
import { register, signin, signout } from '../../controllers'

const router = Router()

router.route('/register').post(validate('register'), register)
router.route('/signin').post(validate('signin'), signin)
router.route('/signout').post(signout)

export { router as routes }
