const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Semua route di bawah ini diproteksi oleh authMiddleware dan adminMiddleware
router.use(authMiddleware);
router.use(adminMiddleware);

router.get("/stats", adminController.getStats);
router.get("/users", adminController.getAllUsers);
router.get("/users/:id", adminController.getUserById);
router.put("/users/:id/suspend", adminController.suspendUser);
router.delete("/users/:id/reset-input", adminController.resetDailyInput);
router.delete("/users/:id", adminController.deleteUser);
router.get("/monitoring", adminController.getMonitoringData);
router.get("/analytics", adminController.getAnalyticsData);
router.get("/filter-options", adminController.getFilterOptions);
router.get("/activities", adminController.getRecentActivities);
router.get("/export-csv", adminController.exportAssessmentData);
router.get("/export-excel", adminController.exportExcelData);

module.exports = router;
