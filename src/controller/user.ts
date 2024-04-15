import {Request, Response} from 'express'
import nodemailer from "nodemailer"
import User from "../models/user"
import { MAILTRAP_PASS, MAILTRAP_USER } from '../utils/variables'

export const create = async (req: Request, res:Response)=>{
    const {name, email, password} = req.body
     const user = await User.create({name, email, password})

     //Send verification email
     const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: MAILTRAP_USER,
          pass: MAILTRAP_PASS
        }
      });

      transport.sendMail({
        to: user.email,
        from: "VictorEhiz@soundify.app",
        html: "<h1> Hello Habibi </h1>"
      })
    res.json({
        message: "user created successfully",
        user
    })
}