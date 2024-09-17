const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const config = require("./config/default.json");
const routes = require("./routes/Route");
const postRoutesmenu = require('./routes/menu');
const passport = require("passport");
const authRoute = require("./routes/facebook.route")

// MongoDB connection
(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL || config.db.path, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('MongoDB Connection Error:', err);
    process.exit(1); // Exit if DB connection fails
  }
})();

const app = express()
const PORT = config.server.port || 8000
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(express.json())

app.use(cors())
app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", authRoute);


mongoose.connect(config.db.path)
    .then(() => console.log('mongoDB Connected...'))
    .catch((err) => console.log(err))


app.use("/api", routes)
app.use(postRoutesmenu);

app.listen(PORT, () => console.log("Listening at " + PORT));
module.exports = app;
