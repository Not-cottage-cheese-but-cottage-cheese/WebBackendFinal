const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const mailsRoutes = require("./src/routes/mail");
const Mail = require("./src/models/mail");
const app = express();
const port = process.env.PORT || 3000;
let db = null;

async function initDb() {
  if (db) {
    await Mail.deleteMany({});
    const large = require("./large.json");
    await Mail.insertMany(large);
  }
}

async function start() {
  try {
    db = await mongoose.connect(process.env.DB_CONN, { useNewUrlParser: true });

    app.use(
      cors({
        origin: process.env.FRONT || "http://localhost:3005",
        optionsSuccessStatus: 200,
      })
    );
    app.use(bodyParser.json());
    app.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );
    app.use("/mails", mailsRoutes);
    initDb();
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();

process.on("SIGTERM", shutDown);
process.on("SIGINT", shutDown);

function shutDown() {
  if (db) {
    db.disconnect();
  }
  process.exit(0);
}
