import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { scheduleRouter } from "./src/routes/scheduleRoute.ts";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use("/schedule", scheduleRouter);

app.listen(process.env.SERVER_PORT || 8000, () => {
  console.log(`Server running on port ${process.env.SERVER_PORT || 8000}`);
});
