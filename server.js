const express=require('express')
const app=express();
require('./src/db/conn')
const port =process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/',require('./src/routes/user'))  // user Api
app.use('/',require('./src/routes/admin'))  // Admin Api
app.use('/',require('./src/routes/game')) // Game Api
app.get('/',(req,res)=>{
    res.send('Hello')
})

app.listen(port,()=>{
    console.log(`server running at port:${port}`);
})