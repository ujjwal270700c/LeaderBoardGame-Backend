const express=require('express');
const router=express.Router();
const {CreateAdmin,LoginAdmin}=require('../controllers/admin')

router.post('/api/admin/signup',CreateAdmin);
router.post('/api/admin/signin',LoginAdmin);

module.exports=router;