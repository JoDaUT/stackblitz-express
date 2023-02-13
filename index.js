"use strict";

require("dotenv").config();
const start = async () => {
  const express = require("express");

  const app = express();
  const port = 3010;

  //load routes
  const deviceRoutes = require("./routes/device.router");

  //mount middlewares
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(express.static("static"));

  // Enable CORS ()
  if (!process.env.NODE_ENV || process.env.NODE_ENV == "development") {
    app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, x-access-token"
      );
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
      );
      next();
    });
  } else {
    /*add your global cors config here */
  }

  //mount routes
  app.use("/device", deviceRoutes);
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
};

start();
