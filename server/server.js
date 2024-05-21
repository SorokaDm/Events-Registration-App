import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import route from "./routes/route.js";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(cors());
app.use(express.json({ extended: true }));

mongoose.connect(process.env.MONGODB_URL);

app.use("/api", route);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
