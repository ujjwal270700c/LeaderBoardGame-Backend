const UserModel=require('../db/models/user')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
require('dotenv').config();
exports.CreateUser=async(req,res)=>{
    const {Name,Age,Location,PhoneNumber,Email_id,Password}=req.body;
    try {
        let user=await UserModel.findOne({PhoneNumber});
        if(user){
            res.status(401).json({msg:"user already exist"});
        }
        const newUser=new UserModel({
            Name,
            Age,
            Location,
            PhoneNumber,
            Email_id,
            Password
        })
        const salt=await bcrypt.genSalt(10)
        newUser.Password=await bcrypt.hash(Password,salt);
        const data=await newUser.save();
        const payload={
                id:newUser._id
        };
        jwt.sign(payload,process.env.SecretKey,{
            expiresIn:360000
        }, (err,token)=>{
           if(err) throw err;
           res.status(200).json({token,data}); 
        })
    } catch (error) {
        res.status(401);
        console.log(error);
    }
}
exports.LoginUser=async(req,res)=>{
    const {PhoneNumber,Password}=req.body;
 
    try {
        let user=await UserModel.findOne({PhoneNumber});
        if(!user){
            res.status(401).json({msg:"user not found"});
        }
        const checkpassword=await bcrypt.compare(Password,user.Password);
        if(!checkpassword){
            return res.status(401).json({msg:"Wrong password"})
        }
        const payload={
                id:user._id
        };
        jwt.sign(payload,process.env.SecretKey,{
            expiresIn:360000
        }, (err,token)=>{
           if(err) throw err;
           res.status(200).json({token,user}); 
        })
    } catch (error) {
        res.status(400);
        console.log(error);
    }
}

exports.UpdateUser=async(req,res)=>{
    const {Name,Age,Location,Email_id}=req.body;
    const empfieds={};
    if(Name) empfieds.Name=Name;
    if(Age) empfieds.Age=Age;
    if(Location) empfieds.Location=Location;
    if(Email_id) empfieds.Email_id=Email_id;
    try {
        let user=await UserModel.findById(req.params.id);
        if(!user){
            return res.status(401).json({msg:"user not found"});
        }
        user=await UserModel.findByIdAndUpdate(req.params.id,{
            $set:empfieds
        },{new: true});
        res.status(200).json(user);
    } catch (error) {
        console.log(error.message);
        res.status(401).send("server error")
        
    }
}
exports.DeleteUser=async(req,res)=>{
    try {
        let user=await UserModel.findById(req.params.id);
        if(!user){
         return res.status(401).json({message:"user not found"});
        }
        deleteuser=await UserModel.findByIdAndDelete(req.params.id);
        res.json(deleteuser)
    } catch (error) {
     console.log(error.message);
     res.status(500).send("server error")
    }
}  