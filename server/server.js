import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import route from "./routes/route.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGODB_URL = process.env.MONGODB_URL;

app.use(cors());
app.use(express.json({ extended: true }));

async function startServer() {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("Connected to MongoDB");

    app.use("/api", route);

    const __dirname = path.resolve();
    app.use(
      express.static(path.join(__dirname, "events-registration-app/dist"))
    );

    app.get("*", (req, res) => {
      res.sendFile(
        path.join(__dirname, "events-registration-app/dist", "index.html")
      );
    });

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

startServer();
