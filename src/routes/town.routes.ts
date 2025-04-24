import express from "express";
import { getTown, createTown, updateTown, deleteTown } from "../controllers/town.controller";
import { TownRepository } from "../repositories/town.repo";
import { authenticateUser } from "../middleware/auth.middleware";


const router = express.Router();

router.get("/",authenticateUser,  getTown);
router.post("/",authenticateUser,  createTown);
router.patch("/:id",authenticateUser,  updateTown);
router.delete("/:id",authenticateUser, deleteTown);
// router.get('/rename', async (req, res) => {
//     const oldName = 'town';
//     const newName = 'towns';
//     const result = await TownRepository.renameCollection(oldName, newName);
//     res.status(result.success ? 200 : 400).json(result);
//   });

export default router;
