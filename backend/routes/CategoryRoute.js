import express from "express";
import { createCategory, getCategoryByUserId, updateCategory, deleteCategory} from "../controllers/CategoryController.js";

const router = express.Router();

router.post('/users/:id/category', createCategory);
router.get('/users/:id/category', getCategoryByUserId);
router.put('/category/:id', updateCategory);
router.delete('/category/:id', deleteCategory);

export default router;