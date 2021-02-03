const express=require('express');
const router=express.Router();
const {CreateUser,LoginUser,UpdateUser,DeleteUser}=require('../controllers/user')
const {requireSignin, userMiddleware,adminMiddleware} =require('../middlewares/common')
const {validateSignupRequest,isRequestValidated,validateSigninRequest} =require('../validator/user')

router.post('/api/user/signup',validateSignupRequest,isRequestValidated ,CreateUser);
router.post('/api/user/signin',validateSigninRequest,isRequestValidated ,LoginUser);
router.put('/api/user/:id',requireSignin, userMiddleware,UpdateUser);
router.delete('/api/user/:id',requireSignin,adminMiddleware ,DeleteUser);

module.exports=router;