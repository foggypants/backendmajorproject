const express = require("express");
const { verifyToken, isAdmin, isStudent } = require("../middleware/authMiddleware");
const {
  addCourse,
  getCourses,
  getCourseById,
  markCompleted,
} = require("../controllers/courseController");
const {
  submitFeedback,
  getAverageRating,
  getAllAverageRatings,
} = require("../controllers/feedbackController");

const router = express.Router();

router.post("/", verifyToken, isAdmin, addCourse);
router.get("/", verifyToken, getCourses);

// must be above the "/:id" routes
router.get("/average-ratings", verifyToken, isAdmin, getAllAverageRatings);

router.get("/:id", verifyToken, getCourseById);
router.post("/:id/complete", verifyToken, isStudent, markCompleted);
router.post("/:id/feedback", verifyToken, isStudent, submitFeedback);
router.get("/:id/average-rating", verifyToken, isAdmin, getAverageRating);

module.exports = router;
