import express from "express";
import {
    getUsers,
    getUsersById,
    createUser, // Register
    updateUser,
    deleteUser,
    loginUser
} from "../controllers/UserController.js";

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', getUsersById);
router.post('/users', createUser); //Register
router.post('/login', loginUser); //Login
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;