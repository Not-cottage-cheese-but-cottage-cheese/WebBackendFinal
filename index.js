const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const mailsRoutes = require("./src/routes/mail");
const app = express();
const port = process.env.PORT || 3000;
let db = null;

async function start() {
  try {
    db = await mongoose.connect(process.env.DB_CONN, { useNewUrlParser: true });

    app.use(
      cors({
        origin: "http://localhost:3001",
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
