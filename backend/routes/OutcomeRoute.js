import express from "express";
import { createOutcome, getAllOutcomeUser,getOutcomeById, updateOutcome, deleteOutcome} from "../controllers/OutcomeController.js";

const router = express.Router();

router.post('/users/:id/outcomes', createOutcome);
router.get('/users/:id/outcomes', getAllOutcomeUser);
// router.get('/users/:id/PieChart', PieChart);
router.get('/outcomes/:id', getOutcomeById);
router.put('/outcomes/:id', updateOutcome);
router.delete('/outcomes/:id', deleteOutcome);

export default router;