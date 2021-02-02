const GameModel = require("../db/models/game");

exports.CreateGame = async (req, res) => {
  const { Name } = req.body;
  try {
    let game = await GameModel.findOne({ Name });
    if (game) {
      res.status(401).json({ msg: "ganme already exist" });
    }
    const newGame = new GameModel({
      Name,
    });
    let data = await newGame.save();
    res.json({data})
  } catch (error) {
    res.status(401);
    console.log(error);
  }
};
exports.GetGame = async (req, res) => {
    try {
        const games = await GameModel.find();
        let Games=[];
        games.forEach(element =>{
            Games.push(element.Name);
        })
        res.json(Games);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("server error")
  };
}