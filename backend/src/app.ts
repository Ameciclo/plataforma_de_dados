import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import routes from "./routes";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import * as dotenv from "dotenv";

dotenv.config();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB,
} = process.env;

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.info("⚡ MongoDB conectado"))
  .catch((error) => console.log(error));

const app = express();

app.use(express.json());
app.use(cors());
app.use(limiter);
app.use(helmet());
app.disable("x-powered-by");
app.use("/contagens/v1", routes);
app.get("*", function (req, res) {
  res.status(404).json({ message: "Not found" });
});
export default app;
