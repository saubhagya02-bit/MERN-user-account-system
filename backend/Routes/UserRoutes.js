import express from "express";
import {getAllUsers, addUsers, getById, updateUser, deleteUser } from "../Controllers/UserControllers.js"; 

const router = express.Router();

router.get("/", getAllUsers);
router.post("/", addUsers);
router.get("/:id", getById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
