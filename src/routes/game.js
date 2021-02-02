const express=require('express');
const router=express.Router();
const {CreateGame,GetGame}=require('../controllers/game');
const {requireSignin, userMiddleware,adminMiddleware} =require('../middlewares/common')

router.post('/api/game',requireSignin,adminMiddleware, CreateGame);
router.get('/api/game',requireSignin,userMiddleware, GetGame);

module.exports=router;