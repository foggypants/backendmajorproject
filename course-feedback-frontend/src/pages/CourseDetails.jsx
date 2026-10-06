import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

function CourseDetails() {
  const { id } = useParams();
  const role = localStorage.getItem("role");

  const [course, setCourse] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const [average, setAverage] = useState(null);

  useEffect(() => {
    api.get("/courses/" + id).then((res) => setCourse(res.data));
  }, [id]);

  const markCompleted = async () => {
    try {
      const res = await api.post("/courses/" + id + "/complete");
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error");
    }
  };

  const submitFeedback = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/courses/" + id + "/feedback", { rating, comment });
      setMessage(res.data.message);
      setComment("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error");
    }
  };

  const getAverage = async () => {
    const res = await api.get("/courses/" + id + "/average-rating");
    setAverage(res.data);
  };

  if (!course) return <p>Loading...</p>;

  return (
    <div>
      <h2>{course.title} ({course.code})</h2>
      <p>{course.description}</p>

      {role === "student" && (
        <div className="box">
          <button onClick={markCompleted}>Mark as Completed</button>

          <h3>Give Feedback</h3>
          <form onSubmit={submitFeedback}>
            <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
            <textarea placeholder="Write your feedback" value={comment} onChange={(e) => setComment(e.target.value)} />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}

      {role === "admin" && (
        <div className="box">
          <button onClick={getAverage}>Show Average Rating</button>
          {average && (
            <p>Average: {average.averageRating} (from {average.totalFeedbacks} feedbacks)</p>
          )}
        </div>
      )}

      <p className="message">{message}</p>
    </div>
  );
}

export default CourseDetails;
