import {Router } from 'express';
import { CreateUserSchema, EmailVerificationBody } from '../utils/validationSchema';
import { validate } from '../middleware/validator';
import { create, verifyEmail} from "../controller/user"


const router = Router()

router.post("/create", validate(CreateUserSchema), create)
router.post("/verify-email", validate(EmailVerificationBody), verifyEmail)
router.post("/re-verify-email", validate(EmailVerificationBody))



export default router