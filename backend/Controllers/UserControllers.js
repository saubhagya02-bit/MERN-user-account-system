import User from "../Model/UserModel.js";

//Display
export const  getAllUsers = async (req, res, next) => {
    let users; 
    try{
        users = await User.find();
    }catch (err) {
        console.log(err);
    }
    if(!users){
        return res.status(404).json({message:"Use not found"});
    }
    return res.status(200).json({users});
};

//Insert
export const addUsers = async (req, res, next) => {
    const {name, gmail, age, address} = req.body;
    let users;
    try{
        user = new User({name, gmail, age, address});
        await user.save();
    }catch (err) {
        console.log(err);
    }

    //Not insert
    if(!user){
        return res.status(404).json({message:"Unable to add users"});
    }
    return res.status(200).json({user});
};

//Get ID
export const getById = async (req, res, next) => {
    const id = req.params.id;
    let user;
    try {
        user = await User.findById(id);
    }catch (err) {
        console.log(err);
    }
    //Not available users
    if(!user){
        return res.status(404).json({message:"User not found"});
    }
    return res.status(200).json({user});
}

//Update 
export const updateUser = async (req, res, next) => {
    const id = req.params.id;
    const {name, gmail, age, address} = req.body;
    let users;

    try{
        users = await User.findByIdAndUpdate(id,
           { name: name, gmail: gmail, age: age, address: address}
        );
        users = await users.save();
    }catch(err) {
        console.log(err);
    }
    if(!users){
        return res.status(404).json({message:"Unable to update user details"});
    }
    return res.status(200).json({users});
};

//Delete
export const deleteUser = async (req, res, next) => {
    const id = req.params.id;
    let user;

    try{
        user = await User.findByIdAndDelete(id)
    }catch(err) {
        console.log(err);
    }
    if(!user){
        return res.status(404).json({message:"Unable to delete user details"});
    }
    return res.status(200).json({user});
};
