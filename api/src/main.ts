import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { heroesRouter } from "./routes/heroes.router";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => res.status(200).end());

app.use("/heroes", heroesRouter)

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on ${port}`);
});