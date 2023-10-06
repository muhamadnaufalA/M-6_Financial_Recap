import express from "express";
import { createIncome, deleteIncome, getIncomeById, getIncomeByUserId, updateIncome } from "../controllers/IncomeController.js";

const router = express.Router();

router.post('/users/:id/incomes', createIncome);
router.get('/users/:id/incomes', getIncomeByUserId);
router.get('/incomes/:id', getIncomeById);
router.patch('/incomes/:id', updateIncome);
router.delete('/incomes/:id', deleteIncome);

export default router;