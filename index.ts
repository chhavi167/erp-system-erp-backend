import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import employeeRoutes from "./routes/employees";
import {verifyToken}  from "./middleware/auth";

import summaryRoutes from "./routes/summary";
import departmentRoutes from "./routes/departments";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/employees", verifyToken, employeeRoutes);


app.use("/api/departments", departmentRoutes);


app.use("/api/summary", summaryRoutes);

app.get("/" , (req , res)=>{
  let data = req.body;
  console.log("Received data:", data);
  console.log("ERP Backend is running");
  res.send("ERP Backend is running");
})
app.listen(3000, () => {
  console.log("Server is running on 3000");
});
