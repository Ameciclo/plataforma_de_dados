import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import routes from "./routes";
import helmet from "helmet";

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
  .then((result) => console.log("⚡ MongoDB conectado"))
  .catch((error) => console.log(error));

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.disable("x-powered-by");
app.use("/v1/", routes);
export default app;
