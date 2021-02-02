const UserModel=require('../db/models/user')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
require('dotenv').config();
exports.CreateAdmin=async(req,res)=>{
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
            Password,
            Role:"admin"
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
exports.LoginAdmin=async(req,res)=>{
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

