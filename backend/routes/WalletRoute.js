import express from "express";
import { createWallet, deleteWallet, getWalletById, getWalletByUserId, updateWallet} from "../controllers/WalletController.js";

const router = express.Router();

router.post('/users/:id/wallets', createWallet);
router.get('/users/:id/wallets', getWalletByUserId);
router.patch('/wallets/:id', updateWallet);
router.delete('/wallets/:id', deleteWallet);
router.get('/wallets/:id',getWalletById);

export default router;