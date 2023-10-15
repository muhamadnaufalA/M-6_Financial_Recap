import express from "express";
import { createBudgetRule, deleteBudgetRule, getBudgetRuleByUserId, updateBudgetRule } from "../controllers/BudgetRuleController.js";

const router = express.Router();

router.post('/users/:id/budgetrule', createBudgetRule);
router.get('/users/:id/budgetrule', getBudgetRuleByUserId);
router.put('/budgetrule/:id', updateBudgetRule);
router.delete('/budgetrule/:id', deleteBudgetRule);

export default router;