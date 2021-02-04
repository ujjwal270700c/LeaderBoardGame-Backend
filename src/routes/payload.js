const express=require('express');
const router=express.Router();
const {CreatePayload,GetPayloadByUser}=require('../controllers/payload');
const {requireSignin, userMiddleware,adminMiddleware} =require('../middlewares/common')

// /api/payload/:id    id should be game ID

router.post('/api/payload/:id',CreatePayload);
router.get('/api/payload/:id',requireSignin,userMiddleware,GetPayloadByUser)

module.exports=router;