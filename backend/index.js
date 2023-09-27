import express from "express";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";
import JenisPengeluaran from "./models/JenisPengeluaranModel.js";
import Category from "./models/CategoryModel.js";
import Income from "./models/IncomeModel.js";
import Outcome from "./models/OutcomeModel.js";
import Wallet from "./models/WalletModel.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(UserRoute);
app.use(JenisPengeluaran);
app.use(Category);
app.use(Income);
app.use(Outcome);
app.use(Wallet);

app.listen(5000, ()=> console.log('Server up and running...'));