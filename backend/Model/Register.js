import mongoose from "mongoose";

const { Schema } = mongoose;

const regiSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    gmail:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
});

const Register = mongoose.model("Register", regiSchema);

export default Register; 