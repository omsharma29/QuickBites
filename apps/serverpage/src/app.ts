import express, { Express, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/PizzasRoute";
require("dotenv").config();

const PORT = process.env.PORT || 8500;

export const app: Express = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

