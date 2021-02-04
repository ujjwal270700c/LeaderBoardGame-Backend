const express=require('express');
const router=express.Router();
const GameModel=require('../db/models/game')
const {requireSignin, userMiddleware} =require('../middlewares/common')

    // /api/leaderboard/:id    id should be game ID


router.get('/api/leaderboard/:id',requireSignin,userMiddleware ,async (req,res)=>{
     try {
         const data = await GameModel.findById({_id:req.params.id})
         const Arr=[]
         const Leaderbd=[]
        const array=data.Users;
        array.forEach(element => {
            Arr.push(element.totalPoints)
        });
       
       Arr.sort((a,b)=>{
           return b-a;
       })
       for(let i=0 ;i<Arr.length;i++){
        const item1 = array.find((c) => c.totalPoints === Arr[i]);

         Leaderbd.push(item1);

       }
       res.json(Leaderbd)
     
          
     } catch (error) {
        res.status(401);
        console.log(error);
     }
});

module.exports=router;