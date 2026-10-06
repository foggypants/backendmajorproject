const Course = require("../models/Course");
const User = require("../models/User");

// Admin adds a course
exports.addCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all courses
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get one course
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (err) {
    res.status(400).json({ message: "Invalid course id" });
  }
};

// Student marks a course as completed
exports.markCompleted = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    await User.findByIdAndUpdate(req.user.id, {
      $addToSet: { completedCourses: course._id },
    });

    res.json({ message: "Course marked as completed" });
  } catch (err) {
    res.status(400).json({ message: "Invalid course id" });
  }
};
