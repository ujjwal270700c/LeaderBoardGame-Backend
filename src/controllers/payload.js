const PayLoadModel = require("../db/models/payload");
const GameModel = require("../db/models/game");

exports.CreatePayload = async (req, res) => {
  try {
    const { Players } = req.body;
    const P1_Score = Players.Player1_Score;
    const P2_Score = Players.Player2_Score;
    if (P1_Score > P2_Score) {
      Players.Player1_Wins = true;
      Players.Player2_Wins = false;
    } else {
      Players.Player2_Wins = true;
      Players.Player1_Wins = false;
    }
    const GameName = req.params.id;
    const newPayload = new PayLoadModel({
      GameName,
      Players,
    });
    console.log(newPayload);
    const data = await newPayload.save(); // payload store in db
    res.json(data);

    const P1WIN = newPayload.Players.Player1_Wins;
    let P1 = newPayload.Players.Player1;
    let P2 = newPayload.Players.Player2;
    async function runUpdate(condition, updateData) {
      console.log(condition, updateData);
      const result = await GameModel.findOneAndUpdate(
        condition,
        {
          $set: {
            "Users.$": updateData,
          },
        },
        {
          new: true,
        }
      );
    }
    /// updating leaderBoard
    let GameUsers = await GameModel.findById(GameName);
    const p1Score = parseInt(P1_Score);
    const p2Score = parseInt(P2_Score);
    const promiseArray = [];
    const empfieds = {
      user: "",
      totalPoints: "",
      totalWins: "",
    };
    const Array = GameUsers.Users;
    const item1 = Array.find((c) => c.user == P1.toString());
    const item2 = Array.find((c) => c.user == P2.toString());
    if (!item1) {
      if (P1WIN) {
        GameUsers.Users.push({ user: P1, totalPoints: p1Score, totalWins: 1 });
        await GameUsers.save();
      } else {
        GameUsers.Users.push({ user: P1, totalPoints: p1Score, totalWins: 0 });
        await GameUsers.save();
      }
    } else {
      console.log(item1);
      if (item1.user == P1.toString()) {
        console.log("done");
        const Total = item1.totalPoints + p1Score;
        condition = {
          "Users.user": P1,
        };

        if (P1WIN) {
          empfieds.user = P1;
          empfieds.totalPoints = Total;
          empfieds.totalWins = item1.totalWins + 1;
          update = empfieds;
        } else {
          empfieds.user = P1;
          empfieds.totalPoints = Total;
          empfieds.totalWins = item1.totalWins;
          update = empfieds;
        }
        promiseArray.push(runUpdate(condition, update));
      }
    }
    if (!item2) {
      if (!P1WIN) {
        GameUsers.Users.push({ user: P2, totalPoints: p2Score, totalWins: 1 });
        await GameUsers.save();
      } else {
        GameUsers.Users.push({ user: P2, totalPoints: p2Score, totalWins: 0 });
        await GameUsers.save();
      }
    } else {
      if (item2.user == P2.toString()) {
        console.log("done");
        const Total = item2.totalPoints + p2Score;
        condition = {
          "Users.user": P2,
        };

        if (!P1WIN) {
          empfieds.user = P2;
          empfieds.totalPoints = Total;
          empfieds.totalWins = item2.totalWins + 1;
          update = empfieds;
        } else {
          empfieds.user = P2;
          empfieds.totalPoints = Total;
          empfieds.totalWins = item2.totalWins;
          update = empfieds;
        }
        promiseArray.push(runUpdate(condition, update));
      }
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("server error");
  }
};
