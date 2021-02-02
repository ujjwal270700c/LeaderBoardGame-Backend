const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
  Name: {
    type: String,
    unique:true,
    required: true,
  },
 Users:[
     {
        user:{
          type: mongoose.Schema.Types.ObjectId,
          ref:'User'
        },
        totalPoints:{
            type:Number,
            required:true
        },
        totalWins:{
            type:Number,
            required:true
        }
     }
    
 ]
 
}, { timestamps: true });

module.exports = mongoose.model("Game", GameSchema);
