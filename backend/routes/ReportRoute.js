import express from "express";
import { getReport } from "../controllers/ReportController.js";

const router = express.Router();

router.get('/users/:id/report', getReport)

export default router;