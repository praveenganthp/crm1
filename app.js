// Importing the Express
const express = require("express");
const app = express();

require("dotenv").config();

const cors = require("cors");

// Importing all the routes
const addTicket = require("./src/addTicket/routes/addTicket.route");
const messageRoute = require("./src/messageReply/routes/message.route");

const mongo = require("./src/addTicket/shared/mongo");

async function loadApp() {
  try {
    // Mongo Connection
    await mongo.connect();

    // Middlewares
    // Enable CORS for all origin
    app.use(cors());

    // Purpose => Parse Request Body
    app.use(express.json());

    // Purpose => Logging
    app.use((req, res, next) => {
      console.log(`${req.url} ${req.method} at ${new Date()}`);
      next();
    });

    // Routes
    app.use("/add-ticket", addTicket);
    app.use("/register", messageRoute);

    // Starting Server
    app.listen(process.env.PORT || 3001, () =>
      console.log(`Server listening at port ...`)
    );
  } catch (err) {
    console.error(err);
    process.exit();
  }
}

loadApp();
