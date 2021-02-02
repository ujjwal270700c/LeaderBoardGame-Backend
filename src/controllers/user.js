const UserModel=require('../db/models/user')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
require('dotenv').config();
exports.CreateUser=async(req,res)=>{
    const {Name,Age,Location,PhoneNumber,Email_id,Password}=req.body;
    try {
        let user=await UserModel.findOne({PhoneNumber});
        if(user){
            res.status(400).json({msg:"user already exist"});
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
           res.json({token,data}); 
        })
    } catch (error) {
        res.status(400);
        console.log(error);
    }
}
exports.LoginUser=async(req,res)=>{
    const {PhoneNumber,Password}=req.body;
 
    try {
        let user=await UserModel.findOne({PhoneNumber});
        if(!user){
            res.status(400).json({msg:"user not found"});
        }
        const checkpassword=await bcrypt.compare(Password,user.Password);
        if(!checkpassword){
            return res.status(400).json({msg:"Wrong password"})
        }
        const payload={
                id:user._id
        };
        jwt.sign(payload,process.env.SecretKey,{
            expiresIn:360000
        }, (err,token)=>{
           if(err) throw err;
           res.json({token,user}); 
        })
    } catch (error) {
        res.status(400);
        console.log(error);
    }
}

exports.UpdateUser=async(req,res)=>{
    const {name,email,phone,designation,salary}=req.body;
    const empfieds={};
    if(name) empfieds.name=name;
    if(email) empfieds.email=email;
    if(phone) empfieds.phone=phone;
    if(designation) empfieds.designation=designation;
    if(salary) empfieds.salary=salary;
    try {
        let employee=await EmpModel.findById(req.params.id);
        if(!employee){
            return res.status(401).json({message:"employee not found"});
        }
        employee=await EmpModel.findByIdAndUpdate(req.params.id,{
            $set:empfieds
        },{new: true});
        res.json(employee)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("server error")
        
    }
}