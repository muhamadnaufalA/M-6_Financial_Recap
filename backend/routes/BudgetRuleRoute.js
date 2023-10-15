import express from "express";
import { createBudgetRule, deleteBudgetRule, getBudgetRuleByUserId, updateBudgetRule } from "../controllers/BudgetRuleController.js";

const router = express.Router();

router.post('/users/:id/jenispengeluaran', createBudgetRule);
router.get('/users/:id/jenispengeluaran', getBudgetRuleByUserId);
router.put('/jenispengeluaran/:id', updateBudgetRule);
router.delete('/jenispengeluaran/:id', deleteBudgetRule);

export default router;