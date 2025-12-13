import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    gmail:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true,
    },
    address:{
        type:String,
        required:true,
    }
});

const User = mongoose.model("UserModel", userSchema);

export default User;