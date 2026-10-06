import { useEffect, useState } from "react";
import api from "../api";

function Admin() {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    api.get("/courses/average-ratings").then((res) => setRatings(res.data));
  }, []);

  return (
    <div>
      <h2>Average Ratings</h2>
      <table>
        <thead>
          <tr>
            <th>Course</th>
            <th>Average Rating</th>
            <th>Total Feedbacks</th>
          </tr>
        </thead>
        <tbody>
          {ratings.map((r) => (
            <tr key={r.courseId}>
              <td>{r.title}</td>
              <td>{r.averageRating}</td>
              <td>{r.totalFeedbacks}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {ratings.length === 0 && <p>No feedback yet.</p>}
    </div>
  );
}

export default Admin;
