import mongoose from 'mongoose';
import { MONGO_URI } from "../utils/variables"


mongoose.connect(MONGO_URI ).then(()=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log("Db connection failed",err);
})
