const express=require('express');
const router=express.Router();
const {CreateUser,LoginUser,UpdateUser}=require('../controllers/user')

router.post('/api/signup',CreateUser);
router.post('/api/signin',LoginUser);
router.put('/:id',UpdateUser);

module.exports=router;