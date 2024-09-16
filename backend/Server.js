const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// MongoDB connection
(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('MongoDB Connection Error:', err);
    process.exit(1); // Exit if DB connection fails
  }
})();

// Routes
const routes = require("./routes/Route");
const postRoutesmenu = require('./routes/menu');
app.use("/api", routes);
app.use(postRoutesmenu);

// Start server
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

module.exports = app;