import { isValidObjectId } from 'mongoose';
import * as Yup from 'yup';

export const CreateUserSchema = Yup.object().shape({
    name: Yup.string().trim().required("Name is missing").min(3, "name is too short").max(20,"Name is too long"),
    email: Yup.string().email("invalid email").required(),
    password: Yup.string().required("password is missing").min(8, "password is too short").max(20, "password is too long")

})

export const EmailVerificationBody = Yup.object().shape({
    otp: Yup.string().trim().required("invalid token"),
    userId: Yup.string().transform(function(value){
        if(this.isType(value) && isValidObjectId(value)){
            return value
        }     
        return ""
    }).required("Invalid userId")
})