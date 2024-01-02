import express from "express";
const app = express();
import authRoutes from "./authRoutes.js";
import noteRoutes from "./noteRoutes.js";
app.use("/auth", authRoutes);
app.use("/notes", noteRoutes);
export default app;
