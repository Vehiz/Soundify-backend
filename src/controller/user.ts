import {Request, Response} from 'express'
import User from "../models/user"

export const create = async (req: Request, res:Response)=>{
    const {name, email, password} = req.body
     const user = await User.create({name, email, password})
    res.json({
        message: "user created successfully",
        user
    })
}