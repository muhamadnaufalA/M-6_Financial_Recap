import express from "express";
import { getRecap, getRecapByMonth} from "../controllers/RecapController.js";

const router = express.Router();

router.get('/users/:id/recap', getRecap);
router.get('/users/:id/recap/month', getRecapByMonth);

export default router;