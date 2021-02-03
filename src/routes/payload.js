const express=require('express');
const router=express.Router();
const {CreatePayload}=require('../controllers/payload');
const {requireSignin, userMiddleware,adminMiddleware} =require('../middlewares/common')

router.post('/api/payload/:id',CreatePayload);


module.exports=router;