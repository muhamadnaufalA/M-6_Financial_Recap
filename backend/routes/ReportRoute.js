import express from "express";
import { getOutcomeReport } from "../controllers/ReportController.js";

const router = express.Router();

router.get('/users/:id/report', getOutcomeReport);

export default router;