const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot be more than 5"],
    },
    comment: {
      type: String,
      required: [true, "Comment is required"],
      trim: true,
      minlength: [5, "Comment must be at least 5 characters"],
      maxlength: [500, "Comment cannot be more than 500 characters"],
    },
  },
  { timestamps: true }
);

// one feedback per student per course
feedbackSchema.index({ course: 1, student: 1 }, { unique: true });

module.exports = mongoose.model("Feedback", feedbackSchema);
