import express from "express";
import prisma from "../prisma";
const router = express.Router();
import { verifyToken } from "../middleware/auth"; 
router.get("/", verifyToken,async (req, res) => {
  const employees = await prisma.employee.findMany();
  res.json(employees);
});

router.use(verifyToken);
router.post("/",verifyToken, async (req, res) => {
  try {
    const {
      name,
      email,
      contact,
      designation,
      address,
      joiningDate,
      photoUrl,
      departmentId,
    } = req.body;
    console.log(" employee data:", req.body);
    const newEmployee = await prisma.employee.create({
      data: {
        name,
       
        email,
        contact,
        designation,
        address,
        joiningDate: new Date(joiningDate), 
        photoUrl,
        departmentId,
      },
    });
    console.log("Created employee:", newEmployee);

    res.status(201).json(newEmployee);
  } catch (err) {
    console.error("Error adding employee:", err);
    res.status(500).json({ error: "Failed to add employee" });
  }
});

router.put("/:id", verifyToken,async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const updatedEmployee = await prisma.employee.update({
      where: { id },
      data: {
        ...req.body,
        joiningDate: req.body.joiningDate
          ? new Date(req.body.joiningDate)
          : undefined,
      },
    });

    res.json(updatedEmployee);
  } catch (err) {
    res.status(500).json({ error: "Failed to update employee" });
  }
});
router.delete("/:id", verifyToken,async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.employee.delete({ where: { id } });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: "Failed to delete employee" });
  }
});

export default router;
