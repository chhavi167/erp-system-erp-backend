
import express from "express";
import {verifyToken} from "../middleware/auth";
import prisma from "../db/db.config"; 

const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
  try {
    const departments = await prisma.department.findMany();
    res.json(departments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch departments" });
  }
});

export default router;
