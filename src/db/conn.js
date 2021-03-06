const mongoose = require("mongoose");
require('dotenv').config();

mongoose
  .connect(process.env.URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false
  })
  .then(() => console.log("connection is sucessful"))
  .catch((err) => console.log("NO connection"));
