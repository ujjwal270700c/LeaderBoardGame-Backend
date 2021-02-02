const express=require('express');
const router=express.Router();
const {CreateUser,LoginUser,UpdateUser,DeleteUser}=require('../controllers/user')
const {requireSignin, userMiddleware,adminMiddleware} =require('../middlewares/common')

router.post('/api/user/signup',CreateUser);
router.post('/api/user/signin',LoginUser);
router.put('/api/user/:id',requireSignin, userMiddleware,UpdateUser);
router.delete('/api/user/:id',requireSignin,adminMiddleware ,DeleteUser);

module.exports=router;