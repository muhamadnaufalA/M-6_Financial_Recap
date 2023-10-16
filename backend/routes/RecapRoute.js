import express from "express";
import { getRecap} from "../controllers/RecapController.js";

const router = express.Router();

router.get('/users/:id/report', getRecap);

export default router;