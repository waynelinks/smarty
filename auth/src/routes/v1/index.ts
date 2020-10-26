import { Router } from 'express'
import { currentUser } from '@bigoncloud/middleware'

import { validate } from '../../middleware'
import { currentActiveUser, register, signin, signout } from '../../controllers'

const router = Router()

router.route('/register').post(validate('register'), register)
router.route('/signin').post(validate('signin'), signin)
router.route('/signout').post(signout)
router.route('/currentuser').get(currentUser, currentActiveUser)

export { router as routes }
