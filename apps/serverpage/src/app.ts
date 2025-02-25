import Express from "express";
require("dotenv").config();
import cookieParser from 'cookie-parser';
import router from "./routes/PizzasRoute";
import cors from "cors";
const PORT = process.env.PORT || 8500;

const app = Express();

app.use(Express.json());
app.use(cookieParser());

app.use(cors())

// Mount router correctly
app.use('/api/v1', router);

app.get('/', (req,res) => {
    res.json({message: "PIZZA API IS RUNNING..."});
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`); // Added missing colon
});