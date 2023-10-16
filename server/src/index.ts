import express from "express";
import http from "http";
import cors from "cors";
import { PORT } from "./utils/config";
import connect from "./db/connect";
import auth from "./routes/auth";
import notification from "./routes/notification";

import { createNotification } from "./controllers/Notification/createNotification";

import { configureSocketIO } from "./sockets/socket";

const app = express();
app.disable("x-powered-by");

const httpServer = http.createServer(app);

configureSocketIO(httpServer);

const databaseURI = process.env.MONGOOSE_URI;
const frontEndURL = process.env.FRONT_END_URL;

if (!databaseURI || !frontEndURL) {
  throw new Error(
    "DATABASE_URI/FRONT_END_URL environment variable are not set."
  );
}

const corsOptions: cors.CorsOptions = {
  origin: [frontEndURL],
  methods: "GET,POST",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth", auth);
app.use("/api/notification", notification);

const start = async () => {
  try {
    await connect(databaseURI);

    httpServer.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
