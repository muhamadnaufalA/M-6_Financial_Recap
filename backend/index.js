import express from "express";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";
import IncomeRoute from "./routes/IncomeRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(UserRoute);
app.use(IncomeRoute);

app.listen(5000, ()=> console.log('Server up and running...'));