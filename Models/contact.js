import mongoose from 'mongoose';

mongoose.connect("mongodb://localhost:27017/Postman_ThunderClient")
.then(()=> console.log("Database Connected!!"))
.catch((err)=>console.log("Error Occured: ",err));

const contactSchema=new mongoose.Schema({
    name:String,
    email:String,
    phone:Number
})
export const contactAll=mongoose.model("contactAll",contactSchema);