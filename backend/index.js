import express from "express";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";
import IncomeRoute from "./routes/IncomeRoutes.js";

import Outcome from "./models/OutcomeModel.js";
import Wallet from "./models/WalletModel.js";
import Category from "./models/CategoryModel.js";
import JenisPengeluaran from "./models/JenisPengeluaranModel.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(UserRoute);
app.use(IncomeRoute);

app.use(Outcome);
app.use(Wallet);
app.use(Category);
app.use(JenisPengeluaran);

app.listen(5000, ()=> console.log('Server up and running...'));