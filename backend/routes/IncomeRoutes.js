import express from "express";
import { createIncome, getIncomeByUserId } from "../controllers/IncomeController.js";

const router = express.Router();

router.post('/users/:id/incomes', createIncome);
router.get('/users/:id/incomes', getIncomeByUserId);

export default router;