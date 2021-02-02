const express=require('express');
const router=express.Router();
const {CreateUser,LoginUser,UpdateUser,DeleteUser}=require('../controllers/user')

router.post('/api/user/signup',CreateUser);
router.post('/api/user/signin',LoginUser);
router.put('/api/user/:id',UpdateUser);
router.delete('/api/user/:id',DeleteUser);

module.exports=router;