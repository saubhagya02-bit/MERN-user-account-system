//password = ZZGgurzj9lRYWULy

import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./Routes/UserRoutes.js";
import multer from "multer";
import path, { dirname, join } from "path";
import { fileURLToPath } from "url";
import cors from "cors";


dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use("/users", router); 

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

//Register
import Register from "./Model/Register.js";

app.post("/register", async(req, res) => {
    const {name, gmail, password} = req.body;
    try{
        await Register.create({
            name,
            gmail,
            password,
        });
        res.json({ status: "ok"});
    } catch (err) {
        console.log(err);
         res.status(500).json({ status: "error", message: err.message });
    }
});

//Login
app.post("/login", async (req, res) => {
    const {gmail, password} = req.body;
    try{
        const user = await Register.findOne({gmail});
        if(!user){
            return res.json({err:"User Not Found"})
        }if(user.password === password){
            return res.json({ status:"Ok"});
        }else{
            return res.json({ status:"Incorrect password"});
        }
    }catch(err){
        console.error(err);
        res.status(500).json({err:"Server Err"});
    }
});

//Img Part

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "/uploads")
    },
    filename:function (req, file, cb){
        cb(null, Date.now() + '-' +file.originalname);
    }
});
const upload = multer({storage: storage});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post("/upload", upload.single("image"), async(req, res) => {
    try{
         res.send({
    message: 'Image uploaded successfully!',
    file: `http://localhost:5000/uploads/${req.file.filename}`
  });
} catch (err) {
    console.error(err);
    res.status(500).send({status:"error", message:err.message});
}
});

app.listen(5000, () => console.log("Server running on port 5000"));

//Display Image
/*app.get("/getImage", async (req, res) => {
    try{
        ImgSchema.find({}).then((data) => {
            res.send({ status: "Ok", data:data});
        });
    }catch (error){
        res.json({ status: error});
    }
});*/