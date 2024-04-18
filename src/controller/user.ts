import { Request, Response } from "express";
import nodemailer from "nodemailer";
import User from "../models/user";
import { MAILTRAP_PASS, MAILTRAP_USER } from "../utils/variables";
import EmailVerificationToken from "../models/emailVerificationToken";
import { generateOtp } from "../utils/helper";

export const create = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });
  //Send verification email
  
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: MAILTRAP_USER,
      pass: MAILTRAP_PASS,
    },
  });
  
  const otp = generateOtp(6);
  await EmailVerificationToken.create({
    owner: user._id,
    otp,
  });

  transport.sendMail({
    to: user.email,
    from: "VictorEhiz@soundify.app",
    html: `<h1> Hello ${user.name}, your verification token is ${otp}</h1>`,
  });
  res.status(201).json({
    message: "user created successfully",
    user,
  });
};

export const verifyEmail = async (req: Request, res: Response)=>{
    const {otp, userId} = req.body;

   const verificationOtp = await EmailVerificationToken.findOne({
      owner: userId
    })
    if(!verificationOtp) return res.status(403).json({
      error: "Invalid token!"
    })

    const matched = await verificationOtp.compareToken(otp)
    if(!matched) return res.status(403).json({
      error: "Invalid token!"
    })

    await User.findByIdAndUpdate(userId, {verified: true})

    await EmailVerificationToken.findByIdAndDelete(verificationOtp._id)

    res.json({message: "Your email is verified"})
}


