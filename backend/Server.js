const express = require("express")
const bodyParser = require('body-parser');
const mongoose = require("mongoose")
require("dotenv").config()
const config = require("./config/default.json")
const routes = require("./routes/Route")
const postRoutesmenu = require('./routes/menu');



const cors = require("cors")

const app = express()
const PORT = config.server.port || 8000
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(express.json())

app.use(cors())


mongoose.connect(config.db.path)
    .then(() => console.log('mongoDB Connected...'))
    .catch((err) => console.log(err))


app.use("/api", routes)
app.use(postRoutesmenu);


app.listen(PORT, () => console.log("Listening at " + PORT))