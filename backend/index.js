import express from "express";
import cors from "cors";

// IMPORT ROUTES //
import UserRoute from "./routes/UserRoute.js";
import IncomeRoute from "./routes/IncomeRoute.js";
import WalletRoute from "./routes/WalletRoute.js";
import OutcomeRoute from "./routes/OutcomeRoute.js";

// IMPORT MODELS //
import Income from "./models/IncomeModel.js";
import Outcome from "./models/OutcomeModel.js";
import Category from "./models/CategoryModel.js";
import JenisPengeluaran from "./models/JenisPengeluaranModel.js";
import User from "./models/UserModel.js"
import Wallet from "./models/WalletModel.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(UserRoute);
app.use(IncomeRoute);
app.use(WalletRoute);
app.use(OutcomeRoute);

app.use(User);
app.use(Income);
app.use(Outcome);
app.use(Category);
app.use(JenisPengeluaran);
app.use(Wallet);


app.listen(5000, ()=> console.log('Server up and running...'));