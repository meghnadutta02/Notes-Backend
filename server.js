import express from "express";
import cookieParser from "cookie-parser";
import apiRoutes from "./routes/apiRoutes.js";
import connect from "./config/db.js";
const app = express();
app.use(cookieParser());
app.use(express.json());

app.get("/", async (req, res, next) => {
  res.json({ message: "API running" });
});

//mongodb connection
connect();

app.use("/api", apiRoutes);

// 404 Not Found middleware
app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

// Custom middlewares to handle errors
app.use((err, req, res, next) => {
  console.error(err);
  next(err);
});

app.use((err, req, res) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
});

app.listen(8000, () => console.log("Server started at port 8000"));
export default app;
