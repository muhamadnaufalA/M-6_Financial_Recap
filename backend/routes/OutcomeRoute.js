import express from "express";
import { createOutcome, getAllOutcomeUser,getOutcomeByOutcomeId, updateOutcome, deleteOutcome} from "../controllers/OutcomeController.js";

const router = express.Router();

router.post('/users/:id/Outcomes', createOutcome);
router.get('/users/:id/Outcomes', getAllOutcomeUser);
router.get('/users/:userId/Outcomes/:id', getOutcomeByOutcomeId);
router.put('/Outcomes/:id', updateOutcome);
router.delete('/Outcomes/:id', deleteOutcome);

export default router;