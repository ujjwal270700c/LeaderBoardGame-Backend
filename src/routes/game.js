const express=require('express');
const router=express.Router();
const {CreateGame,GetGame}=require('../controllers/game');
const {requireSignin, userMiddleware,adminMiddleware} =require('../middlewares/common')
 

// post game only by admin;
// req.body example
// {
//     "Name": "Sudoku"
   
// }


router.post('/api/game',requireSignin,adminMiddleware, CreateGame);
router.get('/api/game',requireSignin,userMiddleware, GetGame);

module.exports=router;