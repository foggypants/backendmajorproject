const mongoose = require("mongoose");
const Course = require("../models/Course");
const User = require("../models/User");
const Feedback = require("../models/Feedback");

// Student submits feedback
exports.submitFeedback = async (req, res) => {
  try {
    const courseId = req.params.id;
    const { rating, comment } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // student must have completed the course
    const student = await User.findById(req.user.id);
    if (!student.completedCourses.includes(courseId)) {
      return res.status(400).json({ message: "You have not completed this course" });
    }

    // duplicate check
    const already = await Feedback.findOne({ course: courseId, student: req.user.id });
    if (already) {
      return res.status(400).json({ message: "You already submitted feedback for this course" });
    }

    const feedback = await Feedback.create({
      course: courseId,
      student: req.user.id,
      rating,
      comment,
    });

    res.status(201).json({ message: "Feedback submitted", feedback });
  } catch (err) {
    // validation errors (rating range, missing comment, etc.)
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: err.message });
  }
};

// Admin: average rating of one course
exports.getAverageRating = async (req, res) => {
  try {
    const courseId = new mongoose.Types.ObjectId(req.params.id);

    const result = await Feedback.aggregate([
      { $match: { course: courseId } },
      {
        $group: {
          _id: "$course",
          averageRating: { $avg: "$rating" },
          totalFeedbacks: { $sum: 1 },
        },
      },
    ]);

    if (result.length === 0) {
      return res.json({ averageRating: 0, totalFeedbacks: 0 });
    }

    res.json({
      averageRating: Number(result[0].averageRating.toFixed(2)),
      totalFeedbacks: result[0].totalFeedbacks,
    });
  } catch (err) {
    res.status(400).json({ message: "Invalid course id" });
  }
};

// Admin: average rating of every course
exports.getAllAverageRatings = async (req, res) => {
  try {
    const result = await Feedback.aggregate([
      {
        $group: {
          _id: "$course",
          averageRating: { $avg: "$rating" },
          totalFeedbacks: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "courses",
          localField: "_id",
          foreignField: "_id",
          as: "course",
        },
      },
      { $unwind: "$course" },
      {
        $project: {
          _id: 0,
          courseId: "$_id",
          title: "$course.title",
          averageRating: { $round: ["$averageRating", 2] },
          totalFeedbacks: 1,
        },
      },
    ]);

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
