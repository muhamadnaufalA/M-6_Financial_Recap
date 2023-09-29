import express from "express";
import { createWallet, deleteWallet, getWalletByUserId, updateWallet } from "../controllers/WalletController.js";

const router = express.Router();

router.post('/users/:id/wallets', createWallet);
router.get('/users/:id/wallets', getWalletByUserId);
router.put('/wallets/:id', updateWallet);
router.delete('/wallets/:id', deleteWallet);

export default router;