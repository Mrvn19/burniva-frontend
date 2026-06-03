require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./src/config/database");
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const dashboardRoutes = require("./src/routes/dashboardRoutes");
const historyRoutes = require("./src/routes/historyRoutes");
const todoRoutes = require("./src/routes/todoRoutes");
const assessmentRoutes = require("./src/routes/assessmentRoutes");
const adminRoutes = require("./src/routes/adminRoutes");
const errorMiddleware = require("./src/middleware/errorMiddleware");
require("./src/models");

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://burniva-capstone.vercel.app",
    process.env.FRONTEND_URL // Sebagai backup jika ada custom domain lain
  ].filter(Boolean),
  credentials: true
}));
app.use(
  express.json({
    limit: '10mb'
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: '10mb'
  })
);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/history", historyRoutes);
app.use("/api/v1/todos", todoRoutes);
app.use("/api/v1/assessment", assessmentRoutes);
app.use("/api/v1/admin", adminRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Burniva Backend Running 🚀"
  });
});

app.get("/", (req, res) => {
  res.send("Burniva Backend API Running 🚀");
});

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

sequelize.authenticate()
  .then(async () => {

    console.log(
      "Database connected successfully ✅"
    );

    await sequelize.sync({
      alter: true
    });

    console.log(
      "Database synchronized ✅"
    );

    app.listen(PORT, () => {
      console.log(
        `Server running on port ${PORT}`
      );
    });

  })
  .catch((error) => {
    console.error("Database connection failed ❌");
    console.error(error);
  });
  