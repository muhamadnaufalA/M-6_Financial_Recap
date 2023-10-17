import express from "express";
import { createOutcome, getAllOutcomeUser,getOutcomeById, updateOutcome, deleteOutcome} from "../controllers/OutcomeController.js";

const router = express.Router();

router.post('/users/:id/Outcomes', createOutcome);
router.get('/users/:id/Outcomes', getAllOutcomeUser);
// router.get('/users/:id/PieChart', PieChart);
router.get('/Outcomes/:id', getOutcomeById);
router.put('/Outcomes/:id', updateOutcome);
router.delete('/Outcomes/:id', deleteOutcome);

export default router;