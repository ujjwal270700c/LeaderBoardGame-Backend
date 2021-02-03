const mongoose = require("mongoose");

const PayloadSchema = new mongoose.Schema(
  {
    GameName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Game",
      required: true,
    },
    Players: {
      Player1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      Player1_Score: {
        type: Number,
        required: true,
      },
      Player1_Wins: {
        type: Boolean,
        enum: [true, false],
        default: false,
      },
      Player2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      Player2_Score: {
        type: Number,
        required: true,
      },
      Player2_Wins: {
        type: Boolean,
        enum: [true, false],
        default: false,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payload", PayloadSchema);
