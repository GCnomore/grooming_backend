import express, { Router } from "express";
import http from "http";
import mongoose from "mongoose";
import { config } from "./config/config";
import Logging from "./library/Logging";
import userRoutes from "./routes/User";
import clientRoutes from "./routes/Client";
import appointmentRoutes from "./routes/Appointment";

const app = express();

mongoose
  .connect(config.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => {
    Logging.info("connected");
    startServer();
  })
  .catch((error) => {
    Logging.error(error);
  });

//* Only start the server if Mongo Connects
const startServer = () => {
  app.use((req, res, next) => {
    //* Log the Request
    Logging.info(
      `Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`
    );

    res.on("finish", () => {
      //* Log the Response
      Logging.info(
        `Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`
      );
    });

    next();
  });

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // API Rules
  app.use((req, res, next) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if (req.method == "OPTIONS") {
      res.set("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }

    next();
  });

  //* Routes
  app.use("/api/user", userRoutes);
  app.use("/api/client", clientRoutes);
  app.use("/api/appointment", appointmentRoutes);

  //* Healthcheck
  app.get("/ping", (req, res, next) =>
    res.status(200).json({ message: "pong" })
  );

  //* Error handling
  app.use((req, res, next) => {
    const error = new Error("not found");
    Logging.error(error);

    return res.status(404).json({ message: error.message, data: req.body });
  });

  http.createServer(app).listen(config.server.port, () =>
    Logging.info(`
      $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
      Server is running on port ${config.server.port}
      $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$`)
  );
};
