import express from "express";
import { createJenisPengeluaran, getJenisPengeluaranByUserId, updateJenisPengeluaran, deleteJenisPengeluaran} from "../controllers/JenisPengeluaranController.js";

const router = express.Router();

router.post('/users/:id/jenispengeluaran', createJenisPengeluaran);
router.get('/users/:id/jenispengeluaran', getJenisPengeluaranByUserId);
router.put('/jenispengeluaran/:id', updateJenisPengeluaran);
router.delete('/jenispengeluaran/:id', deleteJenisPengeluaran);

export default router;