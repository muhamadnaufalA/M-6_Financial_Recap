import express from "express";
import { createIncome, getIncome } from "../controllers/IncomeController.js";

const router = express.Router();

router.post('/users/:id/incomes', createIncome);
router.get('/incomes', getIncome);

export default router;