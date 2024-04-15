import express from "express"
import "dotenv/config"
import "./DB"
import logger from "morgan"
import authRouter from "./routers/auth"
const app = express()

//middlewares
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.use("/auth", authRouter)
const PORT = process.env.PORT || 8080



app.listen(PORT, ()=>{
 console.log(`Server is running on port ${PORT}`)
})