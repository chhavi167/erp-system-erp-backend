import { Router, Request, Response } from "express";
import {verifyToken} from "../middleware/auth";
import prisma from "../db/db.config";

const router = Router();

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const totalEmployees = await prisma.employee.count();
    const totalDepartments = await prisma.department.count();

    res.json({ totalEmployees, totalDepartments });
  } catch (err) {
    console.error("Dashboard summary error:", err);
    res.status(500).json({ error: "Failed to load summary data" });
  }
});

export default router;

